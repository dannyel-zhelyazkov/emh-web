import { useEffect, useState } from 'react'

import { SIDE_NAV_BAR_ITEMS, TOP_NAV_BAR_ITEMS } from '@/common/constants'
import { RedirectNavItem, TabItem } from '@/hooks/@types'
import { useLocation, useNavigate } from 'react-router-dom'

export const useNavItems = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [topNavItem, setTopNavItem] = useState<TabItem>(TOP_NAV_BAR_ITEMS[0])
  const [sideNavItems, setSideNavItems] = useState<RedirectNavItem[]>(
    SIDE_NAV_BAR_ITEMS[topNavItem.key],
  )
  const [sideNavItem, setSideNavItem] = useState<RedirectNavItem>(
    sideNavItems[0],
  )

  useEffect(() => {
    const [, , topItem, sideItem] = location.pathname.split('/')

    if (!topItem) {
      navigate(sideNavItem.to)
      return
    }

    const loadedTopItem = TOP_NAV_BAR_ITEMS.find(
      (item) => item.key === topItem,
    ) as TabItem
    const loadedSideItem = SIDE_NAV_BAR_ITEMS[loadedTopItem.key].find(
      (item) => item.key === sideItem,
    ) as RedirectNavItem

    setTopNavItem(loadedTopItem)
    setSideNavItems(SIDE_NAV_BAR_ITEMS[loadedTopItem.key])
    setSideNavItem(loadedSideItem)
  }, [])

  const isSelected = (key: string, position: 'top' | 'side') => {
    const itemKey = position === 'top' ? topNavItem : sideNavItem

    return itemKey?.key === key ? 'bg-secondary' : 'hover:bg-secondary-50'
  }

  const handleSelectTopItem = (item: TabItem) => {
    if (topNavItem.key === item.key) return

    const newSideItems = SIDE_NAV_BAR_ITEMS[item.key]
    const newSelectedSideItem = newSideItems[0]

    setTopNavItem(item)
    setSideNavItems(newSideItems)
    setSideNavItem(newSelectedSideItem)

    navigate(newSelectedSideItem.to)
  }

  const handleSelectSideItem = (item: RedirectNavItem) => {
    if (sideNavItem?.key === item.key) return

    setSideNavItem(item)
    navigate(item.to)
  }

  return {
    topNavItems: TOP_NAV_BAR_ITEMS,
    sideNavItems,
    isSelected,
    handleSelectTopItem,
    handleSelectSideItem,
    sideNavItem,
  }
}
