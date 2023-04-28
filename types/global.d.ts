import type { PropType as VuePropType } from 'vue'

declare global {
  declare type PropType<T> = VuePropType<T>

  declare type NonNullable<T> = T extends null | undefined ? never : T

  declare type Nullable<T> = T | null

  declare type Recordable<T = any> = Record<string, T>

  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
}
