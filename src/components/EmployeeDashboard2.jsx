import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';






 function EmployeeAnalysis() {

 const [active, setActive] = useState(false);
 const checkIn = () => {
  setActive(!active);
 };



  const theme = useTheme();


  const current = new Date();    
  const currentTime = current.toLocaleTimeString("en-US");
  

  
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  
  



  return (
    <Card sx={{ display: 'flex', backgroundColor: '#f5f5f5', boxShadow:3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4" color={'error'}>
            Today's Analysis 
          </Typography>
          <Typography variant="subtitle1" color="text.error" component="div">
            Attendance Analysis
          </Typography>
         
          
        </CardContent>
        
      </Box>
      <Box>
      <CardContent sx={{ mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Office Start Time</Typography>
       <h1>9:00:00 AM</h1>
       </CardContent>
       
       </Box>

       <Box>
       <CardContent sx={{mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Check-In Since</Typography>
       <h1 style={{color: 'green'}}>{currentTime}</h1>
       </CardContent>
       

       </Box>
       <Box>
       <CardContent sx={{mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Checked-In Time</Typography>
       <h1>{currentTime}</h1>
       </CardContent>
       

       </Box>
       <Box >
        <CardContent sx={{mt:4,ml:12}}>
       <Button onClick={() =>{
        checkIn();
       }} sx={{m:2, mt:6, boxShadow:3,width:200}} style={{backgroundColor: active ? "red" : "green"}} variant="contained" color="error">
            {active ? "Check-Out" : "Check-In"}
            </Button>

            </CardContent>
       </Box>
    </Card>

    

  );
}
export default EmployeeAnalysis
