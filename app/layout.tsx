import './globals.css'

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ko"
      className={`antialiased`}>
      <body>{children}</body>
    </html>
  )
}
