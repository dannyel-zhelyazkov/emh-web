export type TabItem = {
  key: string
  label: string
}

export type RedirectNavItem = {
  to: string
} & TabItem
