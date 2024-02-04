'use client'

import { getTables } from '@/lib/api/table'
import { useQuery } from '@tanstack/react-query';

export default function ChairOptions(){

    const { data, isLoading } = useQuery({ queryKey: ["TABLES"], queryFn: getTables});

    // const data = await getChairs()
    if (isLoading) {
      return null;
    }
  
    return (
      <>
        {data?.map((table) => {
          return (
            <option key={table._id} className="bg-white py-1" value={table.name}>
              {table.name}
            </option>
          );
        })}
      </>
    );
}