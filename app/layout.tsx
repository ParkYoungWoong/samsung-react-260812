import './globals.css'
import { Archivo, Space_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/query'

// 폭(wdth) 축 하나로 덩어리/본문/이름표 세 목소리를 다 낸다.
export const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap'
})

// 기계가 찍은 값 전용.
export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  // title: 'Next.js 연습 프로젝트',
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: 'Next.js 연습 프로젝트(기본 제목)'
  },
  description: 'Next.js 연습 프로젝트',
  openGraph: {
    type: 'website',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    title: 'Next.js 연습 프로젝트(기본 제목)',
    description: 'Next.js 연습 프로젝트',
    images: 'https://heropy.dev/favicon.png'
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ko"
      className={`${archivo.variable} ${spaceMono.variable} antialiased`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
