import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// http://localhost:3000/api/movies?title=spider
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title')
  const page = searchParams.get('page')
  if (!title)
    return NextResponse.json(
      { error: new Error('제목이 필요합니다!') },
      { status: 400 }
    )
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${page}`
  )
  const data = await res.json()
  return NextResponse.json(data)
}
