import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.error.main,
    //backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const QuotaCard = ({ usedDays, availableDays, text, value }) => {
  return (
    <Card
      sx={{
        marginBottom: "10px",
        borderRadius: "8px",
        width: "100%",
        //width: "250px",
        boxShadow: "10px 10px 10px -3px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {text}
        </Typography>
        <BorderLinearProgress variant="determinate" value={value} />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Typography>
            <span style={{ color: "red" }}>
              <b>{`${usedDays} Days`}</b>
            </span>{" "}
            Used
          </Typography>
          <Typography>
            <span style={{ color: "green" }}>
              <b>{`${availableDays} Days`}</b>
            </span>{" "}
            Available
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuotaCard;
