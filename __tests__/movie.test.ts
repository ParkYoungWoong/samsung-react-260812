import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { fetchMovies } from '@/serverActions/movie'

const server = setupServer()

describe('ServerActions fetchMovies', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('검색어로 영화 목록을 요청하면 응답을 반환합니다.', async () => {
    let requestUrl = ''
    server.use(
      http.get('https://omdbapi.com', ({ request }) => {
        requestUrl = request.url
        return HttpResponse.json({
          Response: 'True',
          Search: [
            {
              Title: 'Spider-Man',
              Year: '2026',
              imdbID: '1234567890',
              Type: 'movie',
              Poster: 'https://example.com/poster.jpg'
            }
          ],
          totalResults: '1'
        })
      })
    )
    const data = await fetchMovies('spider')

    expect(new URL(requestUrl).searchParams.get('s')).toBe('spider')
    expect(data.Response).toBe('True')
    expect(data.Search).toHaveLength(1)
    expect(data.Search[0].Title).toBe('Spider-Man')
  })
  test('네트워크 오류가 발생하면 예외를 던집니다.', async () => {
    server.use(
      http.get('https://omdbapi.com', () => {
        return HttpResponse.error()
      })
    )

    await expect(fetchMovies('spider')).rejects.toThrow()
  })
}) // 그룹
