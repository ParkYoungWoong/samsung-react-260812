import './globals.css'
import Header from '@/components/Header'

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ko"
      className={`antialiased`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
