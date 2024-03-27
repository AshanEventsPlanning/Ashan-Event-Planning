'use client'
import Image from 'next/image'
import InfoForm from '@/components/info-form'
import Report from '@/components/report'

export default async function Home() {
  return (
    <div>
      <InfoForm/>
      {/* <Report noOfArrangements={4} type='1'/> */}
    </div>
  )
}
