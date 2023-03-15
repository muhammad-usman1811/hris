import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const LeaveRequestCard = () => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        width: "500px",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Leave Requests
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 460,
          }}
        >
          <Box
            sx={{
              bgcolor: "#E7EBEE",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Michael"
                  src="https://mui.com/static/images/avatar/3.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Michael"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Urgent Leave
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
              <Chip label="Pending" color="error" variant="outlined" />
            </ListItem>
          </Box>
          <Box sx={{ bgcolor: "#E7EBEE", borderRadius: "8px" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Mark Taylor"
                  src="https://mui.com/static/images/avatar/2.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Mark Taylor"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Casual Leave
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
              <Chip label="Pending" color="error" variant="outlined" />
            </ListItem>
          </Box>
        </List>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestCard;
