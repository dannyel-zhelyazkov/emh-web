import { useEffect, useState } from 'react'

import { ConditionalComponent } from '@/components'
import { useClickOutside } from '@/hooks'
import { OptionItem, TriggerFunctionComponent } from '@/ui/@types'
import classNames from 'classnames'

type BaseActionsMenu<T> = {
  options: OptionItem<T>[]
  trigger: TriggerFunctionComponent
  menuPosition?: 'left' | 'right' | 'center'
}

export const BaseActionsMenu = <T extends Record<string, any>>({
  options,
  trigger,
  menuPosition = 'center',
}: BaseActionsMenu<T>) => {
  const { clickedOutside, ref } = useClickOutside<HTMLDivElement>()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  useEffect(() => {
    if (clickedOutside) setShowMenu(false)
  }, [clickedOutside])

  const menuClassName = classNames(
    'absolute w-40 rounded bg-secondary p-3 top-[110%] z-10 select-none',
    {
      '-left-full': menuPosition === 'left',
      'left-0': menuPosition === 'right',
      '-left-1/2': menuPosition === 'center',
    },
  )

  const handleToggleMenu = () => setShowMenu((value) => !value)

  return (
    <div className="relative" ref={ref}>
      {trigger(handleToggleMenu)}
      <ConditionalComponent show={showMenu}>
        <ul className={menuClassName}>
          {options.map((item) => (
            <li
              className="cursor-pointer rounded-half p-1 text-center text-white hover:bg-white hover:text-secondary"
              onClick={() => {
                item.click && item.click(item.data)
                setShowMenu(false)
              }}
              key={item.label}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </ConditionalComponent>
    </div>
  )
}
