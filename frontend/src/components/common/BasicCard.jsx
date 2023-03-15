import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BasicCard = ({ text, content, colorCode }) => {
  return (
    <Card
      sx={{
        bgcolor: colorCode,
        marginBottom: "10px",
        borderRadius: "8px",
        width: "250px",
        boxShadow: "10px 10px 10px -3px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {text}
        </Typography>
        <Typography variant="h5">{content}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
