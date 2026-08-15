import CacheComponent from './CacheComponent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '나의 소개',
  description: '프론트엔드 개발자이고, 강사이고, ...',
  openGraph: {
    type: 'website',
    siteName: 'HEROPY Next.js',
    title: '나의 소개',
    description: '프론트엔드 개발자이고, 강사이고, ...',
    images: 'https://heropy.dev/favicon.png'
  }
}

export default function About() {
  return (
    <>
      <CacheComponent>
        <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
          <p className="stamp text-ash">use cache / cacheLife(&apos;hours&apos;)</p>
          <h1 className="display text-title mt-4">About</h1>
        </section>
      </CacheComponent>

      <div className="px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-lede max-w-[46ch] font-medium">
          프론트엔드 개발자이고, 강사입니다.
        </p>
      </div>
    </>
  )
}
