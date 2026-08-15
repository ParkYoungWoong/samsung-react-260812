'use client'

interface Props {
  error: Error
  retry: () => void
}

export default function Error({ error, retry }: Props) {
  return (
    <>
      <section className="animate-slam bg-alert px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp">영화 정보</p>
        <h1 className="display text-title mt-4">불러오지 못했습니다</h1>
      </section>

      <div className="px-5 py-12 sm:px-8 sm:py-16">
        <p className="stamp">{error.message}</p>
        <button
          type="button"
          className="btn mt-8"
          onClick={() => retry()}>
          다시 시도
        </button>
      </div>
    </>
  )
}
