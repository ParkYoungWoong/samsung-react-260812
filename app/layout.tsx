import './globals.css'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // normal, bold
  display: 'swap'
})

export const metadata: Metadata = {
  // abc: true
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
