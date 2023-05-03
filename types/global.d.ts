import type { PropType as VuePropType } from 'vue'

declare global {
  const GLOBAL_INFO: {
    NODE_ENV: string
    BASE_ENV: string
  }

  declare type PropType<T> = VuePropType<T>

  declare type NonNullable<T> = T extends null | undefined ? never : T

  declare type Nullable<T> = T | null

  declare type Recordable<T = unkonw> = Record<string, T>

  declare type ReadonlyRecordable<T = unkonw> = {
    readonly [key: string]: T
  }
}
