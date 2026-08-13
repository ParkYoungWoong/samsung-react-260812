interface Props {
  children: React.ReactNode
  abc: React.ReactNode
  xyz: React.ReactNode
}

export default function Layout({ children, abc, xyz }: Props) {
  return (
    <>
      {children}
      {abc}
      {xyz}
    </>
  )
}
