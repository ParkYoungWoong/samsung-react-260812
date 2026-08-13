import Image from 'next/image'

interface Props {
  params: Promise<{ movieId: string }>
}

export default async function Poster({ params }: Props) {
  const { movieId } = await params
  return (
    <>
      <Image
        src={`https://img.omdbapi.com?apikey=9d38c929&i=${movieId}&h=2000`}
        alt="영화 포스터"
        width={1500}
        height={2000}
      />
    </>
  )
}
