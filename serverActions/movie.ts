'use server'

export async function fetchMovies(title: string) {
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}`
  )
  return await res.json()
}
