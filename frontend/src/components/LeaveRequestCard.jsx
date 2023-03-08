import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/ListItem";

const LeaveRequestCard = () => {
  return (
    <Card
      sx={{
        marginBottom: "10px",
        borderRadius: "8px",
        width: "500px",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Leave Requests
        </Typography>
        <Stack spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default LeaveRequestCard;
