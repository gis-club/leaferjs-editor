export const FilterEnum = {
  BLUR: 'blur',
} as const

export type FilterEnum = (typeof FilterEnum)[keyof typeof FilterEnum]