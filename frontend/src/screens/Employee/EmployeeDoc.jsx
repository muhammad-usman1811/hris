import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Visibility } from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import CircularProgress from "@mui/material/CircularProgress";
import { getDocs } from "../../actions/docActions";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function EmployeeDoc() {
  const dispatch = useDispatch();

  const docList = useSelector((state) => state.docList);
  const { loading, documents } = docList;

  const handlePreview = (path) => {
    window.open(
      `http://10.51.100.66:5000/documents/${path}?viewonly=true`,
      "_blank"
    );
  };

  useEffect(() => {
    dispatch(getDocs());
  }, [dispatch]);

  return (
    <Grid
      item
      xs={12}
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "20px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <>
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {documents && (
          <Box sx={{ flexGrow: 1 }}>
            <Demo>
              <List>
                {documents &&
                  documents.map((doc) => {
                    return (
                      <ListItem
                        alignItems="center"
                        key={doc.name}
                        sx={{ borderBottom: 1, borderColor: "grey.500" }}
                        secondaryAction={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pr: 1,
                              pb: 1,
                            }}
                          >
                            <IconButton
                              sx={{ ml: 3 }}
                              color="error"
                              edge="end"
                              aria-label="view"
                              onClick={() => handlePreview(doc.url)}
                            >
                              <Visibility />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ArticleIcon color="error" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={doc.name} />
                      </ListItem>
                    );
                  })}
              </List>
            </Demo>
          </Box>
        )}
      </>
      {/* <Demo>
        <List>
          {generate(
            <ListItem
              sx={{ borderBottom: 1, borderColor: "grey.500" }}
              secondaryAction={
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton color="error" edge="end" aria-label="download">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    sx={{ ml: 3 }}
                    color="error"
                    edge="end"
                    aria-label="view"
                  >
                    <Visibility />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ArticleIcon color="error" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Employee Handbook"
                secondary={secondary ? "employee handbook" : null}
              />
            </ListItem>
          )}
        </List>
      </Demo> */}
    </Grid>
  );
}
