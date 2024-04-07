import { colors, Colors } from '@/styles/colorPalette'
import { SerializedStyles } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  const [pregress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }
    window.addEventListener('scroll', scroll)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${pregress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    ></div>
  )
}

export default ScrollProgressBar
