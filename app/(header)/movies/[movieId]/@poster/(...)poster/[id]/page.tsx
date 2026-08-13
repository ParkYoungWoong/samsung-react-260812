'use client'
import Image from 'next/image'
import Modal from '@/components/Modal'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

export default function Poster({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  return (
    <>
      <Modal onClose={() => router.back()}>
        <Image
          src={`https://img.omdbapi.com?apikey=9d38c929&i=${id}&h=2000`}
          alt="영화 포스터"
          width={1500}
          height={2000}
          className="w-full"
        />
      </Modal>
    </>
  )
}
