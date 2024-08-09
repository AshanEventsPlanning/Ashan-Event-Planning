import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
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
export default function OrderTable({rows}) {
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead sx={{backgroundColor:'rgb(0,0,0)'}} >
          <TableRow>
            <TableCell sx={{fontWeight:'bold', color:'white'}}>Item</TableCell>
            <TableCell sx={{fontWeight:'bold', color:'white'}} align="right">Qty.</TableCell>
            <TableCell sx={{fontWeight:'bold', color:'white'}} align="right">Unit Price</TableCell>
            <TableCell sx={{fontWeight:'bold', color:'white'}} align="right">Sum Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:Row) => (
            <TableRow key={row.arrangement}>
              <TableCell>{row.arrangement}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell sx={{fontWeight:'bold'}} colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}} >Service Charge</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}} colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
