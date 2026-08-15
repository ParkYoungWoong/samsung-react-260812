import type { CSSProperties } from 'react'

interface LoaderProps {
  size?: number
  color?: string
  weight?: number
  duration?: number
  className?: string
}

// 각진 사각형이 8단으로 끊어져 돈다. 이 페이지에 곡선은 없다.
export default function Loader({
  size = 20,
  color = '#1400ff',
  weight = 4,
  duration = 1,
  className = ''
}: LoaderProps) {
  const loaderStyle: CSSProperties = {
    width: size,
    height: size,
    borderWidth: weight,
    borderStyle: 'solid',
    borderColor: color,
    borderTopColor: 'transparent',
    borderRadius: 0,
    animation: `loader ${duration}s infinite steps(8, end)`
  }

  return (
    <>
      <style>
        {`
          @keyframes loader {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={loaderStyle}
        className={`absolute top-0 right-0 bottom-0 left-0 m-auto ${className}`}
      />
    </>
  )
}
