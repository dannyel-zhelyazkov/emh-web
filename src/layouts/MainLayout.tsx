import { AppToast } from '@/app'
import { SideNavBar, TopNavBar } from '@/components/navigations'
import { useNavItems } from '@/hooks'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  const {
    topNavItems,
    sideNavItems,
    handleSelectTopItem,
    handleSelectSideItem,
    isSelected,
  } = useNavItems()

  return (
    <AppToast>
      <div className="relative z-10 flex h-full w-full flex-col gap-y-6 overflow-hidden bg-black p-4">
        <div className="relative z-20 flex w-full gap-x-6">
          <div className="glass flex w-[15%] items-center justify-center text-lg text-white">
            EMH
          </div>
          <TopNavBar
            items={topNavItems}
            selectItem={handleSelectTopItem}
            isSelected={isSelected}
          />
        </div>
        <div className="relative z-10 flex min-h-[85%] w-full justify-between gap-x-6">
          <SideNavBar
            items={sideNavItems}
            selectItem={handleSelectSideItem}
            isSelected={isSelected}
          />
          <div className="relative h-full w-[85%] rounded bg-white p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </AppToast>
  )
}
