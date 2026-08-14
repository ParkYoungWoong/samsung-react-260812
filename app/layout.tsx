import './globals.css'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // normal, bold
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
      className={`${roboto.className} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
