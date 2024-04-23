'use client'
import Image from 'next/image'
import InfoForm from '@/components/info-form'
import Report from '@/components/report'
import { UserButton } from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';

export default  function Home() {
  // let { userId } : { userId: string | null } = auth();
  // if(userId == null){
  //   userId= ""
  // }
  // console.log(userId)
  return (
    <div>
      <InfoForm />
      {/* <Report noOfArrangements={4} type='1'/> */}
    </div>
  )
}
