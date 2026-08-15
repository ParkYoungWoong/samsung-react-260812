export default function Loading() {
  return (
    <>
      <section className="bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">영화 검색</p>
        <p className="display text-monolith mt-4 text-hairline">Type a title</p>
      </section>
      <div
        className="clapper"
        data-rolling="true"
        role="presentation"
      />
    </>
  )
}
