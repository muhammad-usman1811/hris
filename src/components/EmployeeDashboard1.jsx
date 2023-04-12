import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment, * as Moment from 'moment';



 function EmployeeDashboard1() {
  const theme = useTheme();


  const current = new Date();    
  const time = current.toLocaleTimeString("en-US");

  



  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', boxShadow:3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4">
            <span style={{color: '#D32F2F'}}>Greetings,</span> Anas Safder
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Full-Stack Developer
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, ml: 1, mt:3 }}>
          <Typography variant="h5" color="initial">Activity Monitoring Dashboard</Typography>
        </Box>
      </Box>
      <Box>
      <CardContent sx={{mt:3,mr:2, p:0, mb:0}}>
       <Typography variant="h4">{time}</Typography>
       </CardContent>
       <CardContent sx={{mt:2,p:0,mr:2, color:"text.primary" }}>
       <Typography variant="h5">{moment(current).format("dddd, MMMM Do YYYY")}</Typography>
       </CardContent>
       </Box>
    </Card>

    

  );
}
export default EmployeeDashboard1
