'use cache'
import Abc from './Abc'
import Xyz from './Xyz'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { cacheTag } from 'next/cache'

function Pending({ label }: { label: string }) {
  return (
    <p className="relative flex items-center gap-4">
      <Loader
        size={24}
        className="relative"
      />
      <span className="stamp text-ash">{label} 대기 중</span>
    </p>
  )
}

export default async function Async() {
  cacheTag('async')
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <>
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">Suspense / 스트리밍</p>
        <h1 className="display text-title mt-4">Async</h1>
        <p className="text-lede mt-7 max-w-[46ch] font-medium text-aggregate">
          경계마다 따로 도착합니다. 준비된 조각부터 화면에 박힙니다.
        </p>
      </section>

      <div className="grid border-t-[3px] border-l-[3px] border-ink sm:grid-cols-2">
        <div className="border-r-[3px] border-b-[3px] border-ink bg-bone px-5 py-10 sm:px-8">
          <Suspense fallback={<Pending label="Abc" />}>
            <Abc />
          </Suspense>
        </div>
        <div className="border-r-[3px] border-b-[3px] border-ink bg-bone px-5 py-10 sm:px-8">
          <Suspense fallback={<Pending label="Xyz" />}>
            <Xyz />
          </Suspense>
        </div>
      </div>
    </>
  )
}
