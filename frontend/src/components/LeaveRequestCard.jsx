import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
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
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getLeaves } from "../actions/leaveActions";
import CardMedia from "@mui/material/CardMedia";

const LeaveRequestCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const leavesList = useSelector((state) => state.leavesList);
  const { loading, leaves } = leavesList;

  const recentLeaves = leaves?.slice(-2);
  const firstLeave = recentLeaves && recentLeaves[1];
  const secondLeave = recentLeaves && recentLeaves[0];

  useEffect(() => {
    dispatch(getLeaves());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <CardMedia
            sx={{ height: 170 }}
            title="leaves"
            image="/images/leave.png"
          />
          <CardContent>
            <Typography variant="h6">Leave Requests</Typography>
            {recentLeaves?.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#E7EBEE",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Michael"
                        src="/images/userPhoto.jpg"
                        //src="https://mui.com/static/images/avatar/3.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={firstLeave && firstLeave.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {firstLeave && firstLeave.type}
                          </Typography>
                          {` — ${firstLeave && firstLeave.reason}`}
                        </React.Fragment>
                      }
                    />
                    <Chip
                      label={firstLeave && firstLeave.status}
                      color={
                        firstLeave && firstLeave.status === "Approved"
                          ? "success"
                          : "error"
                      }
                      variant="outlined"
                    />
                  </ListItem>
                </Box>
                <Box sx={{ bgcolor: "#E7EBEE", borderRadius: "8px" }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Mark Taylor"
                        src="/images/userPhoto.jpg"
                        //src="https://mui.com/static/images/avatar/2.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={secondLeave && secondLeave.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {secondLeave && secondLeave.type}
                          </Typography>
                          {` — ${secondLeave && secondLeave.reason}`}
                        </React.Fragment>
                      }
                    />
                    <Chip
                      label={secondLeave && secondLeave.status}
                      color={
                        secondLeave && secondLeave.status === "Approved"
                          ? "success"
                          : "error"
                      }
                      variant="outlined"
                    />
                  </ListItem>
                </Box>
              </List>
            ) : (
              <Typography>No leaves to display.</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate("/home/leaves")}>
              Details
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default LeaveRequestCard;
