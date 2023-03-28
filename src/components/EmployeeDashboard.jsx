import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import user2 from "./images/user2.png";

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', width:400, height:200 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="name" component="div">
            <h2>Anas Safder</h2>
          </Typography>
          <Typography color="text.secondary"> 
            Full Stack Developer
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
         <Typography sx={{m:1}}>
          <p><strong>Date of Joining:</strong>  01/01/01</p>

         </Typography>
        </Box>
      </Box>
      <img src={user2} alt="" style={{width: "184px", height:"200px"}}/>
    </Card>
  );
}