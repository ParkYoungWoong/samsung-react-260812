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
        <h1>About Page!</h1>
      </CacheComponent>
    </>
  )
}
