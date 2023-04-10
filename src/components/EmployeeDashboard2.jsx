import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';






 function EmployeeAnalysis() {
  const theme = useTheme();


  const current = new Date();    
  const time = current.toLocaleTimeString("en-US");

  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  



  return (
    <Card sx={{ display: 'flex', backgroundColor: '#f5f5f5', boxShadow:3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4">
            Today's Analysis 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Attendance Analysis
          </Typography>
          <Button sx={{m:2, mt:6, boxShadow:3}} variant="contained" color="error">
        Check-In
      </Button>
          
        </CardContent>
        
      </Box>
      <Box>
      <CardContent sx={{ mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Office Start Time</Typography>
       <h1>{time}</h1>
       </CardContent>
       
       </Box>

       <Box>
       <CardContent sx={{mt:10, ml:12}}>
       
        <Typography variant="h5" color="initial">Check-In Time</Typography>
       <h1 style={{color: 'green'}}>{time}</h1>
       </CardContent>
       

       </Box>
       <Box>
       <CardContent sx={{mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Checked-In Since</Typography>
       <h1>{time}</h1>
       </CardContent>
       

       </Box>
    </Card>

    

  );
}
export default EmployeeAnalysis
