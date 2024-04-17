'use client'
import { getChairs } from '@/lib/api/chair'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'

export default function ChairsPage(){

    const { data, isLoading } = useQuery({ queryKey: ["CHAIRS"], queryFn: getChairs});
    if(isLoading){
        <div>Loading...</div>
    }

    return(
        <div className='flex'>
            {
                data?.map((chair)=>(
                    <div className='p-4 m-4 border border-gray-600 rounded-lg shadow-lg'>
                        <Image src={chair.image} alt={chair.name} width={200} height={200}/>
                        <h1 className='p-2 font-bold text-center'>
                            {chair.name}
                        </h1>
                        <h2 className='px-2 py-1 text-center'>Length: {chair.length}</h2>
                        <h2 className='px-2 py-1 text-center'>width: {chair.width}</h2>
                    </div>
                ))
            }
        </div>
    )
}