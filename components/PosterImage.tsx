'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  sizes: string
}

// OMDb가 주는 포스터 주소는 'N/A'이거나 404가 나기도 한다.
// 깨진 이미지 대신 잉크 슬래브를 세운다. 부모에 position: relative가 필요하다.
export default function PosterImage({ src, alt, sizes }: Props) {
  const [failed, setFailed] = useState(false)

  if (src === 'N/A' || failed) {
    return (
      <span className="no-poster display-narrow absolute inset-0 flex items-center justify-center px-3 text-center text-[1.125rem] text-ash">
        No poster
      </span>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  )
}
