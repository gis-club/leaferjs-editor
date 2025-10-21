export const FilterType = {
  BLUR: 'blur',
} as const

export type FilterType = (typeof FilterType)[keyof typeof FilterType]