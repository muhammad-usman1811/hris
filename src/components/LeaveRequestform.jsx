import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SelectAutoWidth() {
  const [leave, setLeave] = React.useState('');

  const handleChange = (event) => {
    setLeave(event.target.value);
  };

  return (
    <><Paper elevation={2} sx={{m:1}} ><h1 style={{color: 'red'}}>Leave Request</h1></Paper>
    
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>



          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                  <FormControl sx={{ m: 1, width: 400 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Leave Type</InputLabel>
                      <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={leave}
                          onChange={handleChange}
                          autoWidth
                          label="Leave Type"
                      >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Annual Leave</MenuItem>
                          <MenuItem value={21}>Casual Leave</MenuItem>
                          <MenuItem value={22}>Sick Leave</MenuItem>
                      </Select>
                  </FormControl>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker sx={{ m: 1, width: 400 }} label="Date" />
                  </DemoContainer>
              </LocalizationProvider>

              <TextField sx={{m:1, mt:2}}
          id="outlined-multiline-static"
          label="Comments"
          multiline
          rows={4}
          defaultValue="Include comments for your approver"
        />

<Stack sx={{display:'flex', flexDirection:'row-reverse', mr:1, mt:2}} spacing={4} direction="row">
      
<Button sx={{ml:1}} variant="contained" color='error'>Request</Button>
      <Button   variant="outlined" color='error'>Cancel</Button>
      
    </Stack>
          </Box>

      </Box></>
  );
}