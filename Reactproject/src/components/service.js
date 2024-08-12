import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
export default function Service1(props) {
    const{description,name,duration,price,image}=props; 
  return (
    
    <Card sx={{ minWidth: 350,maxWidth:350,marginLeft:15,marginTop:10 }}>
      <CardActionArea >
        <CardMedia 
          component="img"
          height="225"
          image={image}
          alt="new service"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" color="text.secondary" >
          price: {price}$
          </Typography>
          <Typography variant='h6' color="text.secondary" >
           duration:{duration}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}