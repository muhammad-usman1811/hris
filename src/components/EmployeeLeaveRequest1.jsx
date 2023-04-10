import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import DownloadIcon from '@mui/icons-material/Download';


export default function MultiActionAreaCard() {
  return (

    <Box sx={{display:'flex', flexDirection:'row'}}>
    <Card sx={{ width: 345, boxShadow:3, ml:4}}>
      <CardActionArea sx={{}}>
        
        <IconButton sx={{ml:20}} aria-label="generate leave" size="large" color='error' >
          <AccessTimeFilledIcon sx={{mt:2}}/>
       </IconButton>
        
        <CardContent>
          <Typography sx={{ml:2}} gutterBottom variant="h5" component="div">
            Generate Leave Request
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>

    <Card sx={{ width:350, boxShadow:3, ml:4}}>
      <CardActionArea sx={{}}>
        
        <IconButton sx={{ml:20}} aria-label="generate leave" size="large" color='error' >
          <HourglassTopIcon sx={{mt:2}}/>
       </IconButton>
        
        <CardContent>
          <Typography sx={{ml:8}} gutterBottom variant="h5" component="div">
            Generate Half Day
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>

    <Card sx={{ width:350, boxShadow:3, ml:4}}>
      <CardActionArea sx={{}}>
        
        <IconButton sx={{ml:20}} aria-label="generate leave" size="large" color='error' >
          <HomeIcon sx={{mt:2}}/>
       </IconButton>
        
        <CardContent>
          <Typography sx={{ml:2}} gutterBottom variant="h5" component="div">
            Generate Work from Home
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>

    <Card sx={{ width:350, boxShadow:3, ml:4}}>
      <CardActionArea sx={{}}>
        
        <IconButton sx={{ml:20}} aria-label="generate leave" size="large" color='error' >
          <AddCardIcon sx={{mt:2}}/>
       </IconButton>
        
        <CardContent>
          <Typography sx={{ml:2}} gutterBottom variant="h5" component="div">
           Generate Work on Holiday
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>

    <Card sx={{ width:350, boxShadow:3, ml:4, mr:4}}>
      <CardActionArea sx={{}}>
        
        <IconButton sx={{ml:20}} aria-label="generate leave" size="large" color='error' >
          <DownloadIcon sx={{mt:2}}/>
       </IconButton>
        
        <CardContent>
          <Typography sx={{ml:0}} gutterBottom variant="h5" component="div">
           Download Experience Letter
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>

    </Box>

    
  );
}