import React from 'react'

import { AvatarNav } from '@/components/navigations/AvatarNav.tsx'
import { TabItem } from '@/hooks'

type TopNavBarProps = {
  items: TabItem[]
  selectItem: (item: TabItem) => void
  isSelected: (key: string, position: 'top' | 'side') => string
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  items,
  selectItem,
  isSelected,
}) => (
  <div className="glass relative flex w-[85%] items-center justify-between self-end p-4">
    <nav className="rounded p-2">
      <ul className="flex text-lg text-white">
        {items.map((item) => (
          <li
            key={item.key}
            className={`${isSelected(item.key, 'top')} mr-2 cursor-pointer rounded p-4 text-white`}
            onClick={() => selectItem(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
    <AvatarNav />
  </div>
)
