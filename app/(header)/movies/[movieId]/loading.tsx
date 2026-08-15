export default function Loading() {
  return (
    <>
      <section className="bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">영화 정보</p>
        <p className="display text-title mt-4 text-hairline">Loading</p>
      </section>
      <div
        className="clapper"
        data-rolling="true"
        role="presentation"
      />
      <div className="grid lg:grid-cols-[minmax(0,21rem)_1fr]">
        <div className="aspect-[2/3] border-r-[3px] border-b-[3px] border-ink bg-aggregate" />
      </div>
    </>
  )
}
