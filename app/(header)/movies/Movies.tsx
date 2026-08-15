'use client'
import { useState } from 'react'
import Link from 'next/link'
import MovieCard from '@/components/MovieCard'
import { fetchMovies } from '@/serverActions/movie'

export interface ResponseDataSuccess {
  Response: 'True'
  Search: Movie[]
  totalResults: `${number}` // '817'
}
export interface ResponseDataError {
  Response: 'False'
  Error: string
}
export type ResponseData = ResponseDataSuccess | ResponseDataError
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

const samples = ['Parasite', 'Oldboy', 'Blade Runner', 'Dune', 'Spider-Man']

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('') // 실제로 조회한 검색어
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState('')
  const [rolling, setRolling] = useState(false)

  async function searchMovies(title = searchText) {
    const keyword = title.trim()
    if (!keyword || rolling) return
    setSearchText(keyword)
    setRolling(true)
    const data = (await fetchMovies(keyword)) as ResponseData
    setQuery(keyword)
    setMovies(data.Response === 'True' ? data.Search : [])
    setTotalResults(data.Response === 'True' ? Number(data.totalResults) : 0)
    setError(data.Response === 'True' ? '' : data.Error)
    setRolling(false)
  }

  return (
    <>
      {/* 슬레이트 - 검색어를 화면 크기 그대로 친다 */}
      <section className="animate-slam bg-ink text-bone">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <div className="min-w-0 flex-1 px-5 pt-8 pb-7 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h1 className="stamp text-aggregate">영화 검색</h1>
              <p className="stamp text-ash">OMDb / 영문 제목</p>
            </div>
            <input
              type="text"
              value={searchText}
              aria-label="영화 제목"
              placeholder="TYPE A TITLE"
              autoComplete="off"
              spellCheck={false}
              className="field display text-monolith mt-4 text-bone"
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') searchMovies()
              }}
            />
          </div>
          <button
            type="button"
            disabled={!searchText.trim() || rolling}
            className="btn btn-invert w-full shrink-0 border-0 px-8 py-5 sm:w-auto sm:items-end sm:py-0 sm:pb-8"
            onClick={() => searchMovies()}>
            {rolling ? '검색 중' : '검색'}
          </button>
        </div>

        {/* 카메라가 돌 때만 줄무늬가 흐른다 */}
        <div
          className="clapper"
          data-rolling={rolling}
          role="presentation"
        />

        <dl
          aria-live="polite"
          className="grid grid-cols-2 sm:grid-cols-4">
          {[
            ['검색어', query || '-'],
            ['전체', totalResults ? totalResults.toLocaleString() : '-'],
            ['표시', movies.length ? String(movies.length) : '-'],
            ['출처', 'OMDb']
          ].map(([label, value]) => (
            <div
              key={label}
              className="min-w-0 border-r-[3px] border-b-[3px] border-hairline px-5 py-3.5 last:border-r-0">
              <dt className="stamp text-ash">{label}</dt>
              <dd className="mt-2.5 truncate font-mono text-lg font-bold text-bone">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {error && (
        <p className="bg-alert px-5 py-4 text-bone sm:px-8">
          <span className="stamp">OMDb / {error}</span>
          <span className="mt-2.5 block text-sm font-medium">
            철자를 확인하거나 다른 제목으로 검색하세요.
          </span>
        </p>
      )}

      {/* 컨택트 시트 */}
      {rolling && !movies.length ? (
        <ul className="grid grid-cols-2 border-t-[3px] border-l-[3px] border-ink sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 10 }, (_, i) => (
            <li
              key={i}
              className="cell">
              <div className="aspect-[2/3] w-full bg-aggregate" />
              <div className="border-t-[3px] border-ink px-3.5 py-3.5">
                <p className="stamp text-aggregate">Loading</p>
              </div>
            </li>
          ))}
        </ul>
      ) : movies.length ? (
        <ul className="grid grid-cols-2 border-t-[3px] border-l-[3px] border-ink sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie, i) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              delay={Math.min(i, 9) * 34}
            />
          ))}
        </ul>
      ) : null}

      {movies.length > 0 && totalResults > movies.length && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-6 sm:px-8">
          <span className="stamp">
            {totalResults.toLocaleString()}개 중 {movies.length}개
          </span>
          <Link
            href="/movies-infinite"
            className="link stamp">
            나머지는 Movies Infinite에서
          </Link>
        </p>
      )}

      {!movies.length && !rolling && (
        /* 빈 화면은 시작하라는 신호 */
        <div className="px-5 py-14 sm:px-8 sm:py-20">
          {!query && (
            <>
              <p className="display-narrow text-block max-w-[24ch]">
                여기에 포스터가 깔립니다
              </p>
              <p className="text-lede mt-6 max-w-[42ch] font-medium">
                OMDb는 영문 제목만 받습니다.
              </p>
            </>
          )}
          <p className="stamp mt-12 first:mt-0">눌러서 바로 검색</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {samples.map(sample => (
              <li key={sample}>
                <button
                  type="button"
                  className="chip"
                  onClick={() => searchMovies(sample)}>
                  {sample}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
