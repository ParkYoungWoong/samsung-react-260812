'use cache'
import Abc from './Abc'
import Xyz from './Xyz'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { cacheTag } from 'next/cache'

export default async function Async() {
  cacheTag('async')
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <>
      <h1>비동기 컴포넌트 스트리밍 예제 페이지!</h1>
      <Suspense
        fallback={
          <Loader
            color="red"
            className="relative"
          />
        }>
        <Abc />
      </Suspense>
      <Suspense
        fallback={
          <Loader
            color="green"
            className="relative"
          />
        }>
        <Xyz />
      </Suspense>
    </>
  )
}
