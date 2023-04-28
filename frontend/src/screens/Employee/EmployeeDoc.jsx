import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import pdfjsLib from "pdfjs-dist/webpack";
//import { Document, Page } from "react-pdf";
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
import DownloadIcon from "@mui/icons-material/Download";
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

  const handleDownload = async (name, url) => {
    let fileUrl = "";
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // deleteDocument(url); // optionally delete the document after download
    } catch (error) {
      console.error(error);
    }
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
                              pb: 1,
                            }}
                          >
                            <IconButton
                              sx={{ ml: 3 }}
                              color="error"
                              edge="end"
                              aria-label="view"
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              sx={{ ml: 3, mr: 2 }}
                              color="error"
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDownload(doc.url, doc.name)}
                            >
                              <DownloadIcon />
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
