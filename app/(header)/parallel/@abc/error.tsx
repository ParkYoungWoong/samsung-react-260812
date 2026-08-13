'use client'

interface Props {
  error: Error
  retry: () => void
}

export default function Error({ error, retry }: Props) {
  return (
    <>
      <h1>에러가 발생!</h1>
      <p>{error.message}</p>
      <button onClick={() => retry()}>다시 시도!</button>
    </>
  )
}
