import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
// @ts-ignore
export default function ItemCard({item, onSelect}) {
  return (
    <Card sx={{ maxWidth: 250, border:'1px solid lightgray' }}>
      <CardActionArea onClick={()=>onSelect(item)} >

        <img src={item.image}  style={{minHeight:'30vh'}} />
        <CardContent>
          {item.name === "Steel Chair" && <Typography variant="body2" style={{display:'flex', alignItems:'center'}} ><StarsIcon style={{color:'rgb(245,230,85)'}} /> Fast Moving Chair</Typography>}
          {item.name === "Reactangular Table" && <Typography variant="body2" style={{display:'flex', alignItems:'center'}} ><StarsIcon style={{color:'rgb(245,230,85)'}} /> Fast Moving Table</Typography>}

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
