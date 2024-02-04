'use client'
import { getTables } from '@/lib/api/table'
import { useQuery } from '@tanstack/react-query';

export default function TablesPage(){

    const { data, isLoading } = useQuery({ queryKey: ["TABLES"], queryFn: getTables});
    if(isLoading){
        <div>Loading...</div>
    }

    return(
        <div className='flex'>
            {
                data?.map((table)=>(
                    <div className='p-4 m-4 border border-black'>
                        <h1 className='p-2 font-bold'>
                            {table.name}
                        </h1>
                        <h2 className='px-2 py-1'>Length: {table.length}</h2>
                        <h2 className='px-2 py-1'>width: {table.width}</h2>
                    </div>
                ))
            }
        </div>
    )
}