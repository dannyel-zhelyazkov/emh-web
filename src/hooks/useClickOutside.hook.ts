import { useEffect, useRef, useState } from 'react'

export const useClickOutside = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      setClickedOutside(true)
      return
    }

    setClickedOutside(false)
  }

  return { ref, clickedOutside }
}
