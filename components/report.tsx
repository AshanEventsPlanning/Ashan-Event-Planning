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
        <div className="flex flex-col justify-start items-center p-8">
            <h1 className="font-bold text-lg p-4">Report</h1>
            <h2>Max No. of Tables: {Math.floor(noOfArrangements)}</h2>
            <h2>No. of chairs: {Math.floor(noOfArrangements * chairsPerTable)}</h2>
        </div>
    );
}