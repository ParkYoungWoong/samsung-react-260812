export default async function Abc() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    <>
      <p className="display text-[2rem]">Abc</p>
      <p className="stamp mt-4">1000ms 뒤 도착</p>
    </>
  )
}
