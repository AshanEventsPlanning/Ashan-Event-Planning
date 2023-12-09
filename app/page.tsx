import Image from 'next/image'
import { getChairs } from '@/lib/api/chair'

export default async function Home() {

  const data = await getChairs()

  return (
    <div className='text-center'>
      <h1 className='font-bold'>
      Space Planning
      </h1>
      {data.map((chair,i) => (
        <div className='py-5' key={i}>
          <h1>{chair.name}</h1>
          <h2>{chair.length }</h2>
          <h2>{chair.width }</h2>
          <h2>{chair.image }</h2>
        </div>
      ))}
    </div>
  )
}
