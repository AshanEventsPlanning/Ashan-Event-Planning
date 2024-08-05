import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ItemCard({item, onSelect}) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={()=>onSelect(item)} >
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <div>
            <span>Length:{item.length}</span>
            <br/>
            <span>Width:{item.width}</span>

          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
