'use client'
import { getChairs } from '@/lib/api/chair'
import { useQuery } from '@tanstack/react-query';

export default function ChairsPage(){

    const { data, isLoading } = useQuery({ queryKey: ["CHAIRS"], queryFn: getChairs});
    if(isLoading){
        <div>Loading...</div>
    }

    return(
        <div className='flex'>
            {
                data?.map((chair)=>(
                    <div className='p-4 m-4 border border-black'>
                        <h1 className='p-2 font-bold'>
                            {chair.name}
                        </h1>
                        <h2 className='px-2 py-1'>Length: {chair.length}</h2>
                        <h2 className='px-2 py-1'>width: {chair.width}</h2>
                    </div>
                ))
            }
        </div>
    )
}