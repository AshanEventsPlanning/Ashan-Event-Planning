'use client'
import Image from 'next/image'
import InfoForm from '@/components/info-form'
import Report from '@/components/report'
import { UserButton } from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  const userId = (user)? user.id : ""

  return (
    <div>
      <InfoForm  userId ={userId}/>
      {/* <Report noOfArrangements={4} type='1'/> */}
    </div>
  )
}
