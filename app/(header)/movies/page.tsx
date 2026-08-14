import Movies from './Movies'
// import { requireSession } from '@/lib/auth'

export default async function MoviesPage() {
  // await requireSession()
  return (
    <>
      <h1>Movies Page!</h1>
      <Movies />
    </>
  )
}
