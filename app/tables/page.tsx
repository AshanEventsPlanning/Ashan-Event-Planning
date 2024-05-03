'use client'
import { getTables } from '@/lib/api/table'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function TablesPage(){

    const { data, isLoading } = useQuery({ queryKey: ["TABLES"], queryFn: getTables});
    if(isLoading){
        <div>Loading...</div>
    }

    return(
        <div className='flex m-8 bg-white'>
            {
                data?.map((table, i)=>(
                    <div key={i} className='p-4 m-4 border border-gray-600  rounded-lg shadow-lg'>
                        <Image src={table.image[0]} alt={table.name} width={200} height={200}/>
                        <h1 className='p-2 font-bold text-center'>
                            {table.name}
                        </h1>
                        <h2 className='px-2 py-1 text-center'>Length: {table.length}</h2>
                        <h2 className='px-2 py-1 text-center'>width: {table.width}</h2>
                    </div>
                ))
            }
        </div>
    )
}