'use client'
import { useState } from 'react'
import Link from 'next/link'
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

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  async function searchMovies() {
    // const res = await fetch(`/api/movies?title=${searchText}`)
    // const data = (await res.json()) as ResponseData
    const data = await fetchMovies(searchText)
    setMovies(data.Response === 'True' ? data.Search : [])
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') searchMovies()
          }}
        />
        <button onClick={() => searchMovies()}>검색</button>
      </div>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link href={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
