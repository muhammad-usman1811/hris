import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1,marginTop:8 }}>
      <Grid>
        <Grid item sx={{borderBottom:1,borderColor:'primary'}}>
          <Item sx={{}}>
            <img style={{width:300}} src="/images/dflogo.png" alt="" />
            </Item>
            </Grid>
            <Grid>
            <Item sx={{height:"76vh"}}>
                <Typography variant="h3" color="initial">Password Reset</Typography>
                <Typography variant="body1">Please enter your new password for your Digifloat HRIS</Typography>
                <TextField sx={{marginTop:4,width:300}}
          required
          id="password"
          label="New Password"
          type='password'
        />
        <br/>
        <TextField sx={{marginTop:4,width:300}}
          required
          id="confirm password"
          label="Confirm Password"
          type='password'
        />
        <br />
         <Button sx={{marginTop:4,width:300}} variant="contained" color="error">
        Save Password
      </Button>
            </Item>
            </Grid>
      </Grid>
    </Box>
  );
}