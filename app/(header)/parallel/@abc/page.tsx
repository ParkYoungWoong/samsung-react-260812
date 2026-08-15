export default async function Abc() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    <>
      <p className="display text-[2rem]">Abc</p>
      <p className="stamp mt-4">@abc 슬롯 / 1000ms</p>
    </>
  )
}
