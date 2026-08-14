'use client'
import { invalidate } from '@/serverActions/invalidateTag'

export default function About() {
  return (
    <>
      <h1 onClick={() => invalidate()}>페이지를 가로챘쥬~😜</h1>
    </>
  )
}
