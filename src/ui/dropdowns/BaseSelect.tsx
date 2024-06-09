import React, { useEffect, useState } from 'react'

import { ConditionalComponent } from '@/components'
import { useClickOutside } from '@/hooks'
import { BaseSelectProps, OptionItem } from '@/ui/@types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleChevronDown,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export const BaseSelect: React.FC<BaseSelectProps> = ({
  searchValue,
  items,
  selectedItem,
  errors,
  onSelect,
  searchable,
  onSearch,
  light,
  required,
  leftIcon,
  label,
  className,
}) => {
  const { clickedOutside, ref } = useClickOutside<HTMLDivElement>()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (clickedOutside) setOpen(false)
  }, [clickedOutside])

  const hasErrors = Array.isArray(errors) ? errors.length : errors

  const renderErrors = Array.isArray(errors) ? (
    errors.map((error) => <p className="text-sm text-red-400">{error}</p>)
  ) : (
    <p className="text-sm text-red-400">{errors}</p>
  )

  const selectClass = classNames('flex w-full items-center rounded-half p-3', {
    'border-white border hover:border-blue text-white': light,
    'border-main border hover:border-secondary text-black': !light,
  })

  const leftIconClass = classNames('mr-3 cursor-pointer text-secondary', {
    'text-white': light,
    'text-black': !light,
  })

  const placeholderClass = classNames('w-full text-black', {
    'text-black-25': !selectedItem,
  })

  const handleOpenSelect = () => setOpen((open) => !open)

  const selectedBg = (item: OptionItem) =>
    item.label === selectedItem?.label ? 'bg-secondary' : ' hover:bg-secondary'

  return (
    <div className={`${className} relative w-full select-none`} ref={ref}>
      <div className={selectClass} onClick={handleOpenSelect}>
        <ConditionalComponent show={!!leftIcon}>
          <FontAwesomeIcon
            icon={leftIcon as IconProp}
            className={leftIconClass}
          />
        </ConditionalComponent>
        {searchable ? (
          <input
            className="w-full bg-inherit text-black outline-none"
            value={searchValue ? searchValue : selectedItem?.label ?? ''}
            placeholder={`${label} ${required ? ' *' : ''}`}
            onClick={(event) => event.stopPropagation()}
            onChange={onSearch}
          />
        ) : (
          <span className={placeholderClass}>
            {selectedItem
              ? selectedItem.label
              : `${label} ${required ? ' *' : ''}`}
          </span>
        )}
        <FontAwesomeIcon
          className="mr-3 text-secondary"
          icon={open ? faCircleChevronDown : faCircleChevronRight}
        />
      </div>
      <ConditionalComponent show={open || !!searchValue}>
        <ul className="absolute z-20 mt-2 w-full rounded-half bg-main p-3">
          {!items.length ? (
            <li className="text-white">No items</li>
          ) : (
            items.map((item) => (
              <li
                className={`cursor-pointer p-2 ${selectedBg(item)} mb-2 rounded-half text-white last:mb-0`}
                key={item.value}
                onClick={() => {
                  onSelect(item)
                  setOpen(false)
                }}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      </ConditionalComponent>
      <ConditionalComponent show={!!hasErrors}>
        <div className="flex flex-col">{renderErrors}</div>
      </ConditionalComponent>
    </div>
  )
}
