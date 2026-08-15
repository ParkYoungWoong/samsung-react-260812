'use client'

interface Props {
  children: React.ReactNode
  onClose?: () => void
}

export default function Modal({ children, onClose }: Props) {
  return (
    <div className="modal fixed top-0 left-0 flex h-screen w-screen items-center justify-center p-5">
      <div
        className="overlay absolute top-0 left-0 h-full w-full bg-ink/85"
        onClick={() => onClose?.()}></div>
      <div className="content relative z-1 max-h-[calc(100%-80px)] w-max max-w-[500px] min-w-[100px] overflow-y-auto border-[3px] border-ink bg-bone">
        {children}
      </div>
    </div>
  )
}
