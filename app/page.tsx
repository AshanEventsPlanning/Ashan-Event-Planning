'use client'

import InfoForm from '@/components/info-form'
import background from "../public/background.jpeg";
import Image from 'next/image'

export default function Home() {

  return (
    <div className='background'>
      <InfoForm />
    </div>
  )
}
