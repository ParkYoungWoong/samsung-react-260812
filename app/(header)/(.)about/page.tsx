import { revalidate } from '@/serverActions/revalidateTag'

export default function About() {
  revalidate()
  return (
    <>
      <h1>페이지를 가로챘쥬~😜</h1>
    </>
  )
}
