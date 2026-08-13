interface Props {
  children: React.ReactNode
  poster: React.ReactNode
}

export default function Layout({ children, poster }: Props) {
  return (
    <>
      {children}
      {poster}
    </>
  )
}
