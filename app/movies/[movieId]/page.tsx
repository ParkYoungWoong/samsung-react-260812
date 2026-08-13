interface Props {
  params: unknown
}

export default async function MovieDetails({ params }: Props) {
  // http://localhost:3000/movies/tt0111161
  const { movieId } = await params
  await fetch(`https://omdbapi.com?apikey=9d38c929&i=${movieId}`)
  return <></>
}
