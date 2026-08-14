'use client'
import moment from 'moment'

export default function Home() {
  const now = moment().format('YYYY-MM-DD')
  return (
    <>
      <h1>Home Page!</h1>
      <p>{now}</p>
    </>
  )
}
