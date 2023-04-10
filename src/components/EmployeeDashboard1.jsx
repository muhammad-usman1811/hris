import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



 function EmployeeDashboard1() {
  const theme = useTheme();


  const current = new Date();    
  const time = current.toLocaleTimeString("en-US");

  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  



  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', boxShadow:3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4">
            <span style={{color: 'red'}}>Greetings,</span> Anas Safder
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
      <CardContent sx={{mr:2, p:0, mb:0}}>
       <h1>{time}</h1>
       </CardContent>
       <CardContent sx={{ml:4, p:0, color:"text.primary" }}>
       <h3>{date}</h3>
       </CardContent>
       </Box>
    </Card>

    

  );
}
export default EmployeeDashboard1
