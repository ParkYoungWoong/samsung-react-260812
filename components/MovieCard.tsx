import Link from 'next/link'
import PosterImage from './PosterImage'

interface Props {
  movie: {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }
  delay?: number
}

// 컨택트 시트 한 칸. 슬래브끼리 테두리를 맞대므로 li가 곧 격자 칸이다.
export default function MovieCard({ movie, delay = 0 }: Props) {
  return (
    <li
      className="cell animate-punch"
      style={{ animationDelay: `${delay}ms` }}>
      <Link
        href={`/movies/${movie.imdbID}`}
        className="flex h-full flex-col outline-none">
        <div className="relative aspect-[2/3] w-full bg-ink">
          <PosterImage
            src={movie.Poster}
            alt={`${movie.Title} 포스터`}
            sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div className="cell-plate flex flex-1 flex-col justify-between gap-3.5 border-t-[3px] border-ink px-3.5 py-3.5">
          <p className="display-narrow text-[1.125rem]">{movie.Title}</p>
          <p className="stamp">
            {movie.Year} / {movie.Type}
          </p>
        </div>
      </Link>
    </li>
  )
}
