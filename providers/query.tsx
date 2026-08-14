'use client'
import {
  QueryClient,
  QueryClientProvider,
  environmentManager
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 클라이언트에서 곧바로 다시 요청하지 않도록, 기본 신선도를 지정
        staleTime: 60 * 1000
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient() // 서버는 요청마다 새로 생성!
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient // 브라우저는 하나를 재사용!
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
