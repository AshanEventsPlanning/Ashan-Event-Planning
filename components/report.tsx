'use client'

import { useState, useEffect } from 'react';
import { getArrangementByName } from '@/lib/api/arrangement';
import { useQuery } from '@tanstack/react-query';

export default function Report({ noOfArrangements, type }: { noOfArrangements: any, type: any }) {
    console.log(type)
    const { data, isLoading } = useQuery({ queryKey: ["REPORT"], queryFn: () => getArrangementByName(type) });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    // console.log(data)
    const chairsPerTable = data?.chairspertable ?? 0;
    return (
        <div className="flex flex-col justify-start items-center p-8 shadow-lg border border-black mx-20 mt-4 rounded-lg bg-lime-200">
            <h1 className="font-bold text-lg p-4 italic ">Report</h1>
            <h2 className='p-2 italic'>Max No. of Tables: {Math.floor(noOfArrangements)}</h2>
            <h2 className='p-2 italic'>Max No. of chairs: {Math.floor(noOfArrangements * chairsPerTable)}</h2>
        </div>
    );
}