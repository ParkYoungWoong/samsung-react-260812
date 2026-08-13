export default async function Parallel() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <>
      <h1>경로 병렬 처리 페이지!</h1>
    </>
  )
}
