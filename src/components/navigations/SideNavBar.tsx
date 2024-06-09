import React from 'react'

import { RedirectNavItem } from '@/hooks'

type SideNavBarProps = {
  items: RedirectNavItem[]
  selectItem: (item: RedirectNavItem) => void
  isSelected: (key: string, position: 'top' | 'side') => string
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  items,
  selectItem,
  isSelected,
}) => {
  return (
    <aside className="glass w-[15%]">
      <nav className="list-none p-2 text-lg text-white">
        {items.map((item) => (
          <li
            key={item.key}
            className={`${isSelected(item.key, 'side')} mb-2 cursor-pointer rounded p-4`}
            onClick={() => selectItem(item)}
          >
            {item.label}
          </li>
        ))}
      </nav>
    </aside>
  )
}
