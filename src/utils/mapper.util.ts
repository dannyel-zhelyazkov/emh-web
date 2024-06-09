export type LabelValueNames<T> = {
  valueName: keyof T
  labelName: keyof T
}

export type OptionType<T> = {
  label: T[keyof T]
  value: T[keyof T]
}

export const mapToOptionItem = <T extends Record<string, any>>(
  data: T[],
  names: LabelValueNames<T>,
): OptionType<T>[] => {
  return data?.map((node) => ({
    label: node[names.labelName],
    value: node[names.valueName],
  }))
}
