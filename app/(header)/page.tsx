'use client'
// import moment from 'moment' // CommonJS
import Link from 'next/link'
import { cloneDeep } from 'lodash-es'

const demos = [
  {
    to: '/movies',
    label: 'Movies',
    note: '서버 액션으로 한 번에 검색하고 컨택트 시트로 깐다'
  },
  {
    to: '/movies-infinite',
    label: 'Movies Infinite',
    note: 'React Query 무한 스크롤로 10개씩 이어 붙인다'
  },
  {
    to: '/about',
    label: 'About',
    note: "'use cache'와 cacheLife로 결과를 붙잡아 둔다"
  },
  {
    to: '/signin',
    label: 'Sign In',
    note: '서버 액션으로 세션을 만들고 원래 가던 곳으로 보낸다'
  },
  {
    to: '/async',
    label: 'Async',
    note: 'Suspense 경계마다 스트리밍으로 따로 도착한다'
  },
  {
    to: '/parallel',
    label: 'Parallel',
    note: '슬롯 하나에 페이지 여러 개를 나란히 건다'
  }
]

export default function Home() {
  const clone = cloneDeep({ a: 1 })

  return (
    <>
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">Next.js 16 / App Router</p>
        <h1 className="display text-monolith mt-4">Heropy Next</h1>
        <p className="text-lede mt-7 max-w-[46ch] font-medium text-aggregate">
          Next.js의 라우팅, 캐싱, 스트리밍을 하나씩 떼어 만든 연습장입니다.
        </p>
      </section>

      <ul className="grid border-t-[3px] border-l-[3px] border-ink sm:grid-cols-2 lg:grid-cols-3">
        {demos.map(demo => (
          <li
            key={demo.to}
            className="cell">
            <Link
              href={demo.to}
              className="cell-plate flex h-full flex-col justify-between gap-10 px-5 py-6 outline-none sm:px-6">
              <p className="display text-[1.75rem]">{demo.label}</p>
              <p className="text-sm font-medium">{demo.note}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* 번들 최적화 확인용 lodash-es 호출 */}
      <p className="stamp px-5 py-6 sm:px-8">cloneDeep 확인값 {clone.a}</p>
    </>
  )
}
