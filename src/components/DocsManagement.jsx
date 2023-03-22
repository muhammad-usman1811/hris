import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PictureAsPdf, Add, Delete, Visibility } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

function generate(element) {
  return [0, 1, 2,3,4,5,6].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
<Box sx={{ mt:15, ml:45, flexGrow: 1, maxWidth: 752 }}>

        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 2, mb: 2, ml: 2 }} variant="h6" component="div">
            <h2>Documents</h2>
          </Typography>
          <Button sx={{mt:2,ml:2, mb:2}} color="error" variant="contained" startIcon={<Add />}>Add Document</Button>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem sx={{borderBottom: 1, borderColor: 'grey.500',}}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton color='error' edge="end" aria-label="download">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton sx={{ml:3}} color='error' edge="end" aria-label="view">
                      <Visibility />
                    </IconButton>
                    <IconButton sx={{ml:3}} color='error' edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>

                    </Box>
                  }
                  
                >
                  
                  <ListItemAvatar >
                    <Avatar >
                      <PictureAsPdf color='primary'  />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Employee Handbook"
                    secondary={secondary ? 'employee handbook' : null}
                  />
                </ListItem>,
                
              )}
            </List>
          </Demo>
        </Grid>
        </Box>

  );
}