'use client'
// import moment from 'moment' // CommonJS
import { cloneDeep } from 'lodash-es'

export default function Home() {
  const clone = cloneDeep({ a: 1 })
  return (
    <>
      <h1>Home Page!</h1>
      <p>{clone.a}</p>
    </>
  )
}
