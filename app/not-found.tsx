import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">404</p>
        <h1 className="display text-monolith mt-4">Not found</h1>
      </section>

      <div className="px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-lede max-w-[46ch] font-medium">
          주소가 바뀌었거나 없는 페이지입니다.
        </p>
        <Link
          href="/"
          className="btn mt-8">
          홈으로 가기
        </Link>
      </div>
    </>
  )
}
