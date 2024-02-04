'use client'

import { getChairs } from '@/lib/api/chair'
import { useQuery } from '@tanstack/react-query';

export default function ChairOptions(){

    const { data, isLoading } = useQuery({ queryKey: ["CHAIRS"], queryFn: getChairs});

    // const data = await getChairs()
    if (isLoading) {
      return null;
    }
  
    return (
      <>
        {data?.map((chair) => {
          return (
            <option key={chair._id} className="bg-white py-1" value={chair.name}>
              {chair.name}
            </option>
          );
        })}
      </>
    );
}