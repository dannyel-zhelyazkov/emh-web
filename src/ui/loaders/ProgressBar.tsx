import React, { useEffect, useRef, useState } from 'react'

type ProgressBarProps = {
  color: string
  pause?: boolean
  onFinish?: () => void
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  pause,
  onFinish,
}) => {
  const progressRef = useRef<HTMLDivElement>(null)

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const [width, setWidth] = useState<number>(100)
  const [finish, setFinish] = useState<boolean>(false)

  useEffect(() => {
    if (!progressRef || !progressRef.current) return

    if (pause) {
      if (intervalId) clearInterval(intervalId)
      setIntervalId(null)

      return
    }

    const element = progressRef.current

    let currentWidth = width

    setIntervalId((timerId) => {
      if (timerId) return timerId

      return setInterval(
        () => {
          if (currentWidth <= 1) {
            setFinish(true)
          } else {
            currentWidth -= 1
            setWidth(currentWidth)
            element.style.width = currentWidth + '%'
          }
        },
        (3000 * (width / 100)) / width, // 3 seconds multiplied by time left (1 full time 0 no time) divided by length left
      )
    })
  }, [pause])

  useEffect(() => {
    if (!finish) return
    if (intervalId) clearInterval(intervalId)
    if (onFinish) onFinish()

    setIntervalId(null)
  }, [finish])

  return (
    <div className="h-5 w-full rounded bg-white-50">
      <div ref={progressRef} className="h-5 rounded bg-white"></div>
    </div>
  )
}
