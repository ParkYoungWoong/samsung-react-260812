interface Props {
  children: React.ReactNode
  abc: React.ReactNode
  xyz: React.ReactNode
}

export default function Layout({ children, abc, xyz }: Props) {
  return (
    <>
      {children}
      <div className="grid border-t-[3px] border-l-[3px] border-ink sm:grid-cols-2">
        <div className="border-r-[3px] border-b-[3px] border-ink bg-bone px-5 py-10 sm:px-8">
          {abc}
        </div>
        <div className="border-r-[3px] border-b-[3px] border-ink bg-bone px-5 py-10 sm:px-8">
          {xyz}
        </div>
      </div>
    </>
  )
}
