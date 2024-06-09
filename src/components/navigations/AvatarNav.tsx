import { useAppDispatch } from '@/hooks'
import { logoutAction } from '@/store/auth'
import { OptionItem, TriggerFunctionComponent } from '@/ui/@types'
import { BaseActionsMenu } from '@/ui/dropdowns/BaseActionsMenu.tsx'
import { useNavigate } from 'react-router-dom'

export const AvatarNav = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const avatarItems: OptionItem<{ navigateTo: string }>[] = [
    {
      label: 'Profile',
      data: { navigateTo: '/profile' },
      click: (data?: { navigateTo: string }) => {
        dispatch(logoutAction())
        if (data) navigate(data.navigateTo)
      },
    },
    {
      label: 'Logout',
      data: { navigateTo: '/login' },
      click: (data?: { navigateTo: string }) => {
        dispatch(logoutAction())
        if (data) navigate(data.navigateTo)
      },
    },
  ]

  const trigger: TriggerFunctionComponent = (onClick) => (
    <div className="h-20 w-20 rounded-[50%] bg-white" onClick={onClick} />
  )

  return (
    <BaseActionsMenu
      options={avatarItems}
      trigger={trigger}
      menuPosition="left"
    />
  )
}
