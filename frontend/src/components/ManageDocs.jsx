import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Add, Visibility } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
//import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
//import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CircularProgress from "@mui/material/CircularProgress";
import DocModal from "./DocModal";
import { deleteDoc, getDocs } from "../actions/docActions";

const ManageDocs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const docList = useSelector((state) => state.docList);
  const { loading, documents } = docList;

  const docUpload = useSelector((state) => state.docUpload);
  const { message, success: successUpload } = docUpload;

  const docDelete = useSelector((state) => state.docDelete);
  const { success: successDelete } = docDelete;

  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(true);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDoc(id));
    }
  };

  const handlePreview = (path) => {
    const newWindow = window.open(
      `http://10.51.100.66:5000/documents/${path}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    if (userInfo && userInfo.role.includes("Admin")) {
      dispatch(getDocs());
    } else {
      navigate("/");
    }
    if (message) {
      setOpenToast(true);
    }
  }, [dispatch, userInfo, navigate, successDelete, successUpload, message]);

  return (
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
      {documents?.length !== 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Box component="div" display="flex" justifyContent="flex-end">
            <Button
              sx={{ ml: 2, mb: 2 }}
              color="error"
              variant="contained"
              onClick={handleToggle}
              startIcon={<Add />}
            >
              Add Document
            </Button>
            <DocModal open={open} onClose={handleClose} />
          </Box>
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
                            onClick={() => handlePreview(doc.url)}
                          >
                            <Visibility />
                          </IconButton>
                          {/* <IconButton
                            color="error"
                            edge="end"
                            aria-label="edit"
                            sx={{ ml: 3 }}
                          >
                            <EditIcon />
                          </IconButton> */}
                          <IconButton
                            sx={{ ml: 3, mr: 2 }}
                            color="error"
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(doc._id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PictureAsPdfIcon color="error" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={doc.name} />
                    </ListItem>
                  );
                })}
            </List>
          </Demo>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Box component="div" display="flex" justifyContent="flex-end">
            <Button
              sx={{ ml: 2, mb: 2 }}
              color="error"
              variant="contained"
              onClick={handleToggle}
              startIcon={<Add />}
            >
              Add Document
            </Button>
            <DocModal open={open} onClose={handleClose} />
          </Box>
          <Demo>
            <List>
              <ListItem
                alignItems="center"
                sx={{ borderBottom: 1, borderColor: "grey.500" }}
              >
                <ListItemText primary="There are no docs to display" />
              </ListItem>
            </List>
          </Demo>
        </Box>
      )}
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openToast}
          onClose={handleToastClose}
          autoHideDuration={3000}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ManageDocs;
