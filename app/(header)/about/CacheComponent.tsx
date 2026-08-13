'use cache'
import { cacheLife } from 'next/cache'

export default async function Component({
  children
}: {
  children: React.ReactNode
}) {
  cacheLife('hours')
  return <div>{children}</div>
}
