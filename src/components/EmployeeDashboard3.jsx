import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';





 function EmployeeFacts() {
  const theme = useTheme();


  const current = new Date();    
  const time = current.toLocaleTimeString("en-US");

  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  



  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', boxShadow:3, height:500 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="h2" color="error">FACTS</Typography>
          <Typography variant="subtitle1" color="initial">Overall Attendance Analysis</Typography>
       </CardContent>
       </Box>
    </Card>

    

  );
}
export default EmployeeFacts
