'use client'

import { getArrangements } from '@/lib/api/arrangement'
import { useQuery } from '@tanstack/react-query';

export default function ArrangementOptions(){

    const { data, isLoading } = useQuery({ queryKey: ["ARRANGEMENTS"], queryFn: getArrangements});

    if (isLoading) {
      return null;
    }
  
    return (
      <>
        {data?.map((arrangement) => {
          return (
            <option key={arrangement._id} className="bg-white py-1" value={arrangement.name}>
              {arrangement.name}
            </option>
          );
        })}
      </>
    );
}