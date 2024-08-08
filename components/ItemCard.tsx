import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// @ts-ignore
export default function ItemCard({item, onSelect}) {
  return (
    <Card sx={{ maxWidth: 250, border:'1px solid lightgray' }}>
      <CardActionArea onClick={()=>onSelect(item)} >

        <img src={item.image}  style={{minHeight:'30vh'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <div>
            <Typography>{item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "LKR",
            })}</Typography>
            <br/>
            <div>Stock: {item.stock}</div>
            <span style={{marginRight:'0.8rem'}}>Length: {item.length}m</span>
            <span>Width: {item.width}m</span>

          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
