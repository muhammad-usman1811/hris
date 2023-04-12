import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import * as moment from 'moment';








 function EmployeeAnalysis() {

 

 const [alignment, setAlignment] = React.useState('web');

 const handleChange = (event, newAlignment) => {
   setAlignment(newAlignment);
 };


 const [checkIn, setCheckIn] = useState(null)

    

    const handleCheckIn = () =>{
      let now = moment()
     setCheckIn (now.format('hh:mm:ss A'))
      console.log({checkIn});
    }



    const [checkOut, setCheckOut] = useState(null)

    const handleCheckOut = () =>{
      let now = moment()
      setCheckOut (now.format('hh:mm:ss A'))
      console.log({checkOut});
    }


    const workHours = (starttime,endtime) => {
    if(!endtime){
      return '';
    }
    let startTime=moment(starttime, "HH:mm:ss a");
    let endTime=moment(endtime, "HH:mm:ss a");
    let duration = moment.duration(endTime.diff(startTime));
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes())-hours*60;

    console.log(hours,minutes);
    return `{${hours}:${minutes}}`

  }





  return (
    <Card sx={{ display: 'flex', backgroundColor: '#f5f5f5', boxShadow:3, justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4" color={'error'}>
            Today's Analysis 
          </Typography>
          <Typography variant="subtitle1" color="text.error" component="div">
            Attendance Analysis
          </Typography>

          <Typography sx={{mt:5}} variant="h6" color="initial">Shift Time</Typography>
          <Typography color={"initial"}>9:00AM To 5:00PM</Typography>
         
          
        </CardContent>
        
      </Box>

      <Box>
      <CardContent sx={{ mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Check-In Time</Typography>
       <Typography variant="h4" color="green">{checkIn?checkIn:"00:00:00"}</Typography>
       </CardContent>
       
       </Box>

       <Box>
       <CardContent sx={{mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Check-Out Time</Typography>
       <Typography variant="h4" color="initial">{checkOut?checkOut:"00:00:00"}</Typography>
       </CardContent>
       

       </Box>
       <Box>
       <CardContent sx={{mt:10, ml:12}}>
        <Typography variant="h5" color="initial">Working Hours</Typography>
       <h1>{workHours} </h1>
       </CardContent>
       

       </Box>
       <Box >
        <CardContent sx={{mt:10}}>
        <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="check-buttons"
    >
      <ToggleButton  onClick={handleCheckIn} color={'success'} value="check-in">Check-In</ToggleButton>
      <ToggleButton  onClick={handleCheckOut} color={'error'} value="check-out">Check-Out</ToggleButton>
    </ToggleButtonGroup>

            </CardContent>
       </Box>
    </Card>

    

  );
}
export default EmployeeAnalysis
