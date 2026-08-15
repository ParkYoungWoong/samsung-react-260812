import Image from 'next/image'

interface Props {
  params: Promise<{ movieId: string }>
}

export default async function Poster({ params }: Props) {
  const { movieId } = await params
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink p-5 sm:p-10">
      <Image
        src={`https://img.omdbapi.com?apikey=9d38c929&i=${movieId}&h=2000`}
        alt="영화 포스터"
        width={1500}
        height={2000}
        className="h-auto w-auto max-w-full border-[3px] border-bone object-contain"
        style={{ maxHeight: 'calc(100dvh - 2.5rem)' }}
      />
    </div>
  )
}
