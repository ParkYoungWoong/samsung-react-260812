export default async function Xyz() {
  await new Promise(resolve => setTimeout(resolve, 4000))
  return (
    <>
      <p className="display text-[2rem]">Xyz</p>
      <p className="stamp mt-4">4000ms 뒤 도착</p>
    </>
  )
}
