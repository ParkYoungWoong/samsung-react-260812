import Link from 'next/link'
import PosterImage from '@/components/PosterImage'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`,
    {
      cache: 'force-cache'
    }
  )
  const movie = (await res.json()) as Movie
  return {
    title: movie.Title, // 'Spider-Man | HEROPY Next.js'
    description: movie.Plot,
    openGraph: {
      type: 'website',
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster
    }
  } satisfies Metadata as Metadata
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
  if (movie.Response === 'False') notFound()

  const specs = [movie.Year, movie.Rated, movie.Runtime, movie.Genre].filter(
    spec => spec && spec !== 'N/A'
  )
  const credits = [
    ['감독', movie.Director],
    ['각본', movie.Writer],
    ['출연', movie.Actors],
    ['개봉', movie.Released],
    ['국가', movie.Country],
    ['수상', movie.Awards]
  ].filter(([, value]) => value && value !== 'N/A')

  return (
    <>
      {/* 필름 캔 라벨 */}
      <section className="animate-slam bg-ink px-5 pt-8 pb-7 text-bone sm:px-8">
        <p className="stamp text-ash">
          {movie.imdbID} / {movie.Type}
        </p>
        <h1 className="display text-title mt-4">{movie.Title}</h1>
        {specs.length > 0 && (
          <p className="stamp mt-6 text-aggregate">{specs.join('  /  ')}</p>
        )}
      </section>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,21rem)_1fr]">
        <div className="border-b-[3px] border-ink lg:border-r-[3px] lg:border-b-0">
          <Link
            href={`/poster/${movie.imdbID}`}
            className="relative block aspect-[2/3] bg-ink">
            <PosterImage
              src={movie.Poster}
              alt={`${movie.Title} 포스터`}
              sizes="(min-width: 1024px) 21rem, 100vw"
            />
          </Link>
          <p className="stamp border-t-[3px] border-ink px-5 py-4">
            눌러서 원본 포스터 보기
          </p>
        </div>

        <div className="min-w-0">
          <div className="border-b-[3px] border-ink px-5 py-8 sm:px-8">
            <p className="text-lede max-w-[58ch] font-medium">{movie.Plot}</p>
          </div>

          <dl className="border-b-[3px] border-ink">
            {credits.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-2 border-b-[3px] border-ink px-5 py-4 last:border-b-0 sm:flex-row sm:gap-6 sm:px-8">
                <dt className="stamp shrink-0 pt-1 sm:w-24">{label}</dt>
                <dd className="min-w-0 font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          {movie.Ratings?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {movie.Ratings.map(rating => (
                <div
                  key={rating.Source}
                  className="border-b-[3px] border-ink px-5 py-5 sm:border-r-[3px] sm:px-8 sm:last:border-r-0">
                  <p className="stamp">{rating.Source}</p>
                  <p className="display mt-3 text-[2rem]">{rating.Value}</p>
                </div>
              ))}
            </div>
          )}

          <p className="px-5 py-8 sm:px-8">
            <Link
              href="/movies"
              className="link stamp">
              검색으로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
