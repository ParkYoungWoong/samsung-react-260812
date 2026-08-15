'use client'
import { invalidate } from '@/serverActions/invalidateTag'

export default function About() {
  return (
    <>
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">Intercepting route</p>
        <h1 className="display text-title mt-4">가로챘습니다</h1>
      </section>

      <div className="px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-lede max-w-[46ch] font-medium">
          같은 주소지만 이동 방식에 따라 다른 화면이 뜹니다.
        </p>
        <button
          type="button"
          className="btn mt-8"
          onClick={() => invalidate()}>
          캐시 비우기
        </button>
      </div>
    </>
  )
}
