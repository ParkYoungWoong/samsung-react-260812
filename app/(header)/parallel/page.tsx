export default async function Parallel() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
      <p className="stamp text-ash">Parallel routes / 슬롯</p>
      <h1 className="display text-title mt-4">Parallel</h1>
      <p className="text-lede mt-7 max-w-[46ch] font-medium text-aggregate">
        하나의 레이아웃에 슬롯을 여러 개 걸고, 각자 자기 속도로 채웁니다.
      </p>
    </section>
  )
}
