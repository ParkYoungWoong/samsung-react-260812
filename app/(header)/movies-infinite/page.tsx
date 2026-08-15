'use client'
import { useState, useEffect } from 'react'
import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query'
import { useMovieStore } from '@/stores/movie'
import { useInView } from 'react-intersection-observer'
import MovieCard from '@/components/MovieCard'
import Loader from '@/components/Loader'

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

export default function Movies() {
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 700px 0px'
  })

  const options = infiniteQueryOptions({
    queryKey: ['movies', searchText],
    queryFn: async ({ signal, pageParam }) => {
      const res = await fetch(
        `/api/movies?title=${searchText}&page=${pageParam}`,
        { signal }
      )
      const page = (await res.json()) as ResponseData
      if (page.Response === 'False') throw new Error(page.Error)
      return page
    },
    staleTime: 1000 * 60 * 5, // 캐싱하는 시간(ms)
    enabled: Boolean(searchText),
    placeholderData: prev => prev, // 깜빡이는 부분에 채워넣을 데이터
    getNextPageParam: (lastPage, pages) => {
      const maxPage = Math.ceil(Number(lastPage.totalResults) / 10)
      const currentPage = pages.length
      if (currentPage < maxPage) return currentPage + 1
      return null
    },
    initialPageParam: 1,
    select: data => ({
      movies: data.pages.flatMap(page => page.Search),
      totalResults: Number(data.pages[0].totalResults),
      loadedPages: data.pages.length
    })
  })

  const { data, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery(options)
  const movies = data?.movies ?? []

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      {/* 슬레이트 - 스크롤이 닿는 만큼 계속 감긴다 */}
      <section className="animate-slam bg-ink text-bone">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <div className="min-w-0 flex-1 px-5 pt-8 pb-7 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h1 className="stamp text-aggregate">영화 검색 / 무한 스크롤</h1>
              <p className="stamp text-ash">OMDb / 영문 제목</p>
            </div>
            <input
              type="text"
              value={inputText}
              aria-label="영화 제목"
              placeholder="TYPE A TITLE"
              autoComplete="off"
              spellCheck={false}
              className="field display text-monolith mt-4 text-bone"
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') fetchMovies()
              }}
            />
          </div>
          <button
            type="button"
            disabled={!inputText.trim()}
            className="btn btn-invert w-full shrink-0 border-0 px-8 py-5 sm:w-auto sm:items-end sm:py-0 sm:pb-8"
            onClick={() => fetchMovies()}>
            검색
          </button>
        </div>

        <div
          className="clapper"
          data-rolling={isFetching}
          role="presentation"
        />

        <dl
          aria-live="polite"
          className="grid grid-cols-2 sm:grid-cols-4">
          {[
            ['검색어', searchText || '-'],
            [
              '전체',
              data?.totalResults ? data.totalResults.toLocaleString() : '-'
            ],
            ['불러옴', movies.length ? String(movies.length) : '-'],
            ['페이지', data?.loadedPages ? String(data.loadedPages) : '-']
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
          <span className="stamp">OMDb / {error.message}</span>
          <span className="mt-2.5 block text-sm font-medium">
            철자를 확인하거나 다른 제목으로 검색하세요.
          </span>
        </p>
      )}

      {movies.length > 0 && (
        <ul className="grid grid-cols-2 border-t-[3px] border-l-[3px] border-ink sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie, i) => (
            <MovieCard
              key={`${movie.imdbID}-${i}`}
              movie={movie}
              delay={Math.min(i % 10, 9) * 34}
            />
          ))}
        </ul>
      )}

      {!movies.length && !isFetching && !error && (
        <div className="px-5 py-14 sm:px-8 sm:py-20">
          <p className="display-narrow text-block max-w-[24ch]">
            스크롤이 닿는 만큼 계속 불러옵니다
          </p>
          <p className="text-lede mt-6 max-w-[42ch] font-medium">
            제목을 입력하면 10개씩 이어서 깔립니다.
          </p>
        </div>
      )}

      {isFetching && (
        <p className="flex items-center justify-center gap-4 py-10">
          <Loader
            size={28}
            className="relative"
          />
          <span className="stamp">불러오는 중</span>
        </p>
      )}

      {/* 무한 스크롤 감시 지점 */}
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          display: isFetching || !hasNextPage ? 'none' : 'block',
          height: '10px'
        }}
      />
    </>
  )
}
