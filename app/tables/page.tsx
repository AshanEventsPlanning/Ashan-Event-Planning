'use client'
import { getTables } from '@/lib/api/table'
import { useQuery } from '@tanstack/react-query'
import { Box, Grid } from "@mui/material";
import React from "react";
import ItemCard from "@/components/ItemCard";

export default function TablesPage(){

    const { data, isLoading } = useQuery({ queryKey: ["TABLES"], queryFn: getTables});
    if(isLoading){
        <div>Loading...</div>
    }

    return(
      <Box sx={{margin:'2rem'}} >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm:12, md: 20}}>
              {data && data.map((item: any, index: React.Key | null | undefined) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <ItemCard item={item} onSelect={()=>{}} />
                </Grid>
              ))}
          </Grid>
      </Box>
    )
}