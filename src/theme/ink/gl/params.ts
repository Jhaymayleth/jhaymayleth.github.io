import type { Theme } from '../theme'

/** Aspecto ajustable en vivo de la tinta. */
export interface InkParams {
  /** Segundos que tarda la expansión (antes del fundido de 150 ms). */
  duration: number
  /** Alcance de los tentáculos; 0 = mancha limpia. */
  tendril: number
  /** Frecuencia del ruido: más bajo = formas más grandes y perezosas. */
  noiseScale: number
  /** Media anchura del frente, en píxeles CSS. */
  softness: number
  /** Velocidad a la que la forma evoluciona durante la expansión. */
  drift: number
  /** Velocidad global de reproducción. */
  timeScale: number
}

export const inkParams: InkParams = {
  duration: 1.4,
  tendril: 1,
  noiseScale: 1,
  softness: 1.4,
  drift: 1,
  timeScale: 1,
}

/** Color del pigmento que se acumula en el frente, según el tema que se revela. */
export const RIM_COLOR: Record<Theme, [number, number, number]> = {
  dark: [0.02, 0.025, 0.022], // tinta: un punto más densa que el fondo #0e100f
  light: [0.985, 0.978, 0.96], // lejía: un punto más clara que el papel #f7f5f0
}
