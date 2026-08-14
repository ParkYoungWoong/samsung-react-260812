import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: Promise<{ movieId: string }>
}
export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

export default async function MovieDetails({ params }: Props) {
  // http://localhost:3000/movies/tt0111161
  const { movieId } = await params
  // await new Promise(resolve => setTimeout(resolve, 3000))
  // throw new Error('알 수 없는 문제로 영화 정보를 가져올 수 없습니다.')
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`,
    {
      cache: 'force-cache'
    }
  )
  const movie = (await res.json()) as Movie

  return (
    <>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <Link href={`/poster/${movie.imdbID}`}>
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={200}
          height={300}
        />
      </Link>
    </>
  )
}
