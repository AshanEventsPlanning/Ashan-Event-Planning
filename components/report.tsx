'use client'

import { useState, useEffect } from 'react';
import { getArrangementByName } from '@/lib/api/arrangement';
import { useQuery } from '@tanstack/react-query';

// export default function Report({ noOfArrangements, type }: { noOfArrangements: any, type: any }) {
//     console.log(type)
//     const { data, isLoading } = useQuery({ queryKey: ["REPORT"], queryFn: () => getArrangementByName(type) });
//
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//     // console.log(data)
//     const chairsPerTable = data?.chairspertable ?? 0;
//     return (
//         <div className="flex flex-col justify-start items-center p-8 shadow-lg border border-black mx-20 mt-4 rounded-lg bg-lime-200">
//             <h1 className="font-bold text-lg p-4 italic ">Report</h1>
//             <h2 className='p-2 italic'>Max No. of Tables: {Math.floor(noOfArrangements)}</h2>
//             <h2 className='p-2 italic'>Max No. of chairs: {Math.floor(noOfArrangements * chairsPerTable)}</h2>
//         </div>
//     );
// }
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import OrderTable from "@/components/OrderTable";
import { Box } from "@mui/material";
import { createNewOrder } from "@/lib/api/order";
import { z } from "zod";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

interface Row {
  arrangement: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// @ts-ignore
export default function Report({order, isDisabled}) {
  const [openReport, setOpenReport] = React.useState(false);
  const [noOfChairs, setNoOfChairs]=useState(0)
  const [noOfTables, setNoOfTables]=useState(0)
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{
    let newRows:Row[] = [];
    let chairCount=0;
    let tableCount=0;
    order.arrangements.length !==0 && order.arrangements.map((arrangement: { selectedArrangement: { chairspertable: number; }; noOfArrangements: number; })=>{
      chairCount = chairCount + (arrangement.selectedArrangement?.chairspertable*arrangement.noOfArrangements);
      tableCount = tableCount + arrangement.noOfArrangements
    })
    newRows.push({
      arrangement: order.chair.name,
      qty: chairCount,
      unit: order.chair.price,
      price: chairCount*order.chair.price,
    })
    newRows.push({
      arrangement: order.table.name,
      qty: tableCount,
      unit: order.table.price,
      price: tableCount*order.table.price,
    })
    setRows(newRows)
    setNoOfChairs(chairCount);
    setNoOfTables(tableCount);

  },[order])
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const handleClickOpenReport = () => {
    console.log(order)
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const placeOrder=async ()=>{
    const data={
      chair: order.chair._id,
      table: order.table._id,
      noOfChairs: noOfChairs,
      noOfCTables: noOfTables,
      totalPrice: invoiceTotal,
      location: order.reservationData.location,
      date: order.reservationData.date,
      time: order.reservationData.time,
    }
    try {
      await createNewOrder(data,order.chair, order.table, noOfChairs, noOfTables);
      handleCloseReport()
    }catch (err){
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <Button size={"large"} fullWidth variant={'outlined'} onClick={handleClickOpenReport} disabled={isDisabled}  >Proceed</Button>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{fontWeight:'bold'}} >
         Reservation Confirmation
        </DialogTitle>
       <Box sx={{mx:'2rem',my:'1rem'}} >
         <Box>
           <tr>
             <td style={{fontWeight:'bold'}} >Order Location</td>
             <td>{order.reservationData.location}</td>
           </tr>
           <tr>
             <td style={{fontWeight:'bold', width:'10rem'}} >Reservation Date</td>
             <td>{order.reservationData.date}</td>
           </tr>
           <tr>
             <td style={{fontWeight:'bold'}} >Reservation Time</td>
             <td>{order.reservationData.time}</td>
           </tr>
         </Box>
         <br/>
         <OrderTable rows={rows}/>
       </Box>
        <DialogActions sx={{mx:'2rem',my:'1rem'}}>
          <Button autoFocus onClick={handleCloseReport}>
            Cancel
          </Button>
          <Button onClick={placeOrder} autoFocus>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
