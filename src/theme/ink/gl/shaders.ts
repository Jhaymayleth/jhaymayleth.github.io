import { NOISE_CELLS } from './noiseTexture'

/** Triángulo a pantalla completa generado desde gl_VertexID — sin buffers. */
export const FULLSCREEN_VERT = /* glsl */ `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`

/**
 * Ink bleed entre dos capturas del documento completo.
 *
 * Espacios de coordenadas:
 *  - px de dispositivo: gl_FragCoord, volteado a origen superior izquierdo
 *  - px CSS:             px de dispositivo / uCanvasScale (relativo al viewport)
 *  - px de textura:      px de dispositivo * map.x + map.yz (escala + scroll en texels);
 *                        map.w = 1 voltea Y para fuentes renderizadas en framebuffer
 *  - espacio de ruido:   (px CSS - clic) / uRef, para que el patrón escale con el viewport
 *
 * La máscara es un campo con signo f en px CSS (f < 0 = entintado):
 *   f = d - R * reach(p)  - tendrils(p)  + fibre(p)  - cleanup
 *   reach    : fbm con domain warping (mancha irregular grande) + fbm solo de dirección
 *              (lóbulos anisótropos, para que la gota sea irregular incluso siendo diminuta)
 *   tendrils : fbm ridged muestreado sobre la dirección unitaria, desplazado por la
 *              distancia para que las crestas se curven y ramifiquen al viajar
 *   fibre    : ruido estático en espacio de pantalla (fibras de papel) que deshilacha
 *              la frontera
 *   cleanup  : garantiza cobertura total cuando progress -> 1
 */
export const INK_FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2 uFromSize;     // px de textura
uniform vec2 uToSize;       // px de textura
uniform vec4 uFromMap;      // (px textura por px dispositivo, offset x, offset y, flipY)
uniform vec4 uToMap;
uniform float uCanvasScale; // px dispositivo por px CSS
uniform vec2 uRes;          // canvas en px de dispositivo

uniform vec2 uCenter;       // px CSS, relativo al viewport
uniform float uRadius;      // px CSS, radio base con easing
uniform float uCleanup;     // px CSS, alcance extra uniforme que garantiza cobertura al final
uniform float uTime;        // segundos desde el clic (ya escalados por slow-mo)
uniform float uRef;         // px CSS, longitud de referencia del ruido (lado mayor)
uniform vec2 uSeed;
uniform mat2 uSeedRot;

uniform float uTendril;     // intensidad de tentáculos, 0..2
uniform float uNoiseScale;  // multiplicador de frecuencia del ruido
uniform float uSoftness;    // media anchura del frente, px CSS
uniform float uDrift;       // velocidad de evolución temporal
uniform vec3 uRimColor;     // color del pigmento acumulado en el frente

out vec4 outColor;

// Presupuesto de forma: cuánto puede adelantarse / atrasarse la mancha respecto a R.
const float A_LOBE = 0.22;
const float A_BLOB = 0.20;
const float A_SUM = A_LOBE + A_BLOB;
const float TENDRIL_REACH = 0.24; // x R x uTendril
const float FIBRE_PX = 1.8;
const float THIN_MAX_PX = 26.0;
const float SPECK_PX = 18.0;
const float HAZE_PX = 16.0; // debe quedar <= SPECK_PX (cota exterior)

// ---------- ruido ----------

// Ruido de gradiente precalculado y tileable (ver noiseTexture.ts): una unidad de
// retícula por cada 1/NOISE_CELLS de la textura. textureLod mantiene el muestreo
// independiente de las derivadas, indefinidas dentro de las ramas de salida temprana.
uniform sampler2D uNoise;
const float INV_CELLS = 1.0 / ${NOISE_CELLS.toFixed(1)};

// Ruido de gradiente, aproximadamente [-1, 1].
float gnoise(vec2 p) {
  return textureLod(uNoise, p * INV_CELLS, 0.0).r * 2.0 - 1.0;
}

// Segundo canal decorrelado (fibras, motas).
float gnoise2(vec2 p) {
  return textureLod(uNoise, p * INV_CELLS, 0.0).g * 2.0 - 1.0;
}

const mat2 OCT = mat2(0.8, 0.6, -0.6, 0.8) * 2.03;

float fbm3(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { s += a * gnoise(p); p = OCT * p + 17.13; a *= 0.5; }
  return s / 0.875;
}

float fbm4(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * gnoise(p); p = OCT * p + 17.13; a *= 0.5; }
  return s / 0.9375;
}

float fbm5(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * gnoise(p); p = OCT * p + 17.13; a *= 0.5; }
  return s / 0.96875;
}

// ---------- capturas ----------

vec3 sampleDoc(sampler2D tex, vec2 size, vec4 map, vec2 devPx) {
  vec2 texPx = devPx * map.x + map.yz;
  if (map.w > 0.5) texPx.y = size.y - texPx.y;
  vec2 uv = clamp(texPx, vec2(0.5), size - 0.5) / size;
  return texture(tex, uv).rgb;
}

void main() {
  vec2 devPx = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 css = devPx / uCanvasScale;
  vec2 rel = css - uCenter;
  float d = length(rel);
  float R = uRadius;
  float cleanup = uCleanup;

  // Cotas conservadoras de f: evita el ruido lejos de la frontera.
  float inner = R * (1.0 - A_SUM) + cleanup - FIBRE_PX - THIN_MAX_PX - uSoftness * 2.0;
  float outer = R * (1.0 + A_SUM) * (1.0 + TENDRIL_REACH * uTendril) + cleanup + FIBRE_PX + SPECK_PX + uSoftness * 2.0;
  if (d < inner) {
    outColor = vec4(sampleDoc(uTo, uToSize, uToMap, devPx), 1.0);
    return;
  }
  if (d > outer) {
    outColor = vec4(sampleDoc(uFrom, uFromSize, uFromMap, devPx), 1.0);
    return;
  }

  float t = uTime * uDrift;
  vec2 p = rel / uRef;
  vec2 dir = uSeedRot * (rel / max(d, 1e-3));
  float ns = uNoiseScale;

  // Domain warp, evolucionando en el tiempo para que el borde hierva en vez de escalar.
  vec2 q = p * (2.4 * ns) + uSeed;
  vec2 w = vec2(
    fbm3(q + vec2(0.0, 0.31 * t)),
    fbm3(q + vec2(5.2, 1.3) - vec2(0.27 * t, 0.0))
  );

  // Mancha irregular grande (fbm con warp en espacio de página: perezosa con radios
  // pequeños, rica con radios grandes) + lóbulos suaves solo de dirección para que
  // incluso una gota diminuta sea asimétrica.
  float blob = fbm5(q + 2.3 * w + vec2(0.12 * t, -0.08 * t));
  vec2 lq = dir * 0.9 + uSeed.yx * 0.37 + vec2(0.06 * t);
  float lobes = gnoise(lq) * 0.75 + gnoise(lq * 2.1 + 9.1) * 0.25;
  float reach = clamp(1.0 + A_LOBE * 1.6 * lobes + A_BLOB * 1.5 * blob, 1.0 - A_SUM, 1.0 + A_SUM);
  float f = d - R * reach;

  // Tentáculos: filamentos finos sobre las líneas cero de un fbm muestreado en el
  // círculo de direcciones. El término de distancia desplaza las líneas lateralmente
  // al extenderse (rizado), el warp las curva y las octavas del fbm las bifurcan.
  float gate = smoothstep(-0.35, 0.4, fbm3(dir * 1.6 + uSeed * 0.61 + 3.7));
  vec2 tq = dir * (2.2 * ns) + (d / uRef) * vec2(2.6, -1.9) * ns + 1.2 * w + uSeed * 1.7 + vec2(0.0, 0.18 * t);
  float n = fbm4(tq);
  float ridgePx = abs(n) * max(d, 24.0) / (4.0 * ns);
  float lenN = gnoise(dir * 3.1 + uSeed * 0.43 + vec2(0.1 * t)) * 0.5 + 0.5;
  float L = uTendril * TENDRIL_REACH * R * gate * (0.35 + 0.65 * lenN);
  float along = clamp(f / max(L, 1.0), 0.0, 1.0);
  float width = clamp(R * 0.022, 1.5, 9.0) * (1.0 - along * along) * gate;
  float ft = max(f - L, ridgePx - width);
  // Unión suave: los filamentos se abren hacia la mancha sin formar una arista.
  float k = 6.0;
  float hh = clamp(0.5 + 0.5 * (ft - f) / k, 0.0, 1.0);
  f = mix(ft, f, hh) - k * hh * (1.0 - hh);

  // Fibras de papel: estáticas en pantalla para que no centelleen.
  vec2 fq = css * 0.34 + uSeed * 13.0;
  float fibre = gnoise2(fq) * 0.65 + gnoise2(OCT * fq + 5.3) * 0.35;
  f += fibre * FIBRE_PX;

  f -= cleanup;

  // ---------- composición ----------
  float soft = max(uSoftness, 0.6);
  float inked = 1.0 - smoothstep(-soft, soft, f);

  // La tinta se afina justo detrás del frente: densidad ~0.6 que sube a sólida. El
  // ancho varía con el ruido de la mancha para que la banda no parezca un contorno.
  float thinW = mix(3.0, THIN_MAX_PX, clamp(blob * 0.8 + 0.3, 0.0, 1.0));
  float density = mix(0.6, 1.0, smoothstep(0.0, thinW, -f));
  float cov = inked * density;

  // Halo de difusión: gradiente tenue justo delante de la frontera, irregular
  // (ruido de fibra) para leerse como pigmento sangrando en papel húmedo.
  float hazeW = mix(4.0, HAZE_PX, clamp(0.5 + 0.5 * blob, 0.0, 1.0));
  float haze = (1.0 - smoothstep(0.0, hazeW, f)) * smoothstep(-0.3, 0.6, 0.35 * fibre + w.x);
  cov = max(cov, haze * 0.24 * step(0.0, f));

  // Motas: gotas aisladas justo delante del frente, más raras con la distancia.
  float ahead = clamp(f / SPECK_PX, 0.0, 1.0);
  if (f > 0.0 && ahead < 1.0) {
    float sn = gnoise2(css * 0.55 + uSeed * 7.0 + 41.0) * 0.5 + 0.5;
    float th = mix(0.80, 0.96, ahead);
    cov = max(cov, smoothstep(th, th + 0.04, sn) * 0.75 * (1.0 - ahead));
  }

  vec3 from = sampleDoc(uFrom, uFromSize, uFromMap, devPx);
  vec3 to = sampleDoc(uTo, uToSize, uToMap, devPx);
  vec3 col = mix(from, to, cov);

  // Borde de pigmento acumulado en el frente (más oscuro para tinta, más claro para lejía).
  float rimX = (f + soft * 1.1) / (soft * 1.4 + 1.2);
  float rim = exp(-rimX * rimX) * inked;
  col = mix(col, uRimColor, rim * 0.45);

  outColor = vec4(col, 1.0);
}
`
