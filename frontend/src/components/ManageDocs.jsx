import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Add, Delete, Visibility } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import DocModal from "./DocModal";
import { getDocs } from "../actions/docActions";

const ManageDocs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const docList = useSelector((state) => state.docList);
  const { documents } = docList;
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getDocs());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="div" display="flex" justifyContent="flex-end">
        <Button
          sx={{ mt: 2, ml: 2, mb: 2 }}
          color="error"
          variant="contained"
          onClick={handleToggle}
          startIcon={<Add />}
        >
          Add Document
        </Button>
        <DocModal open={open} onClose={() => setOpen(false)} />
      </Box>
      <Demo>
        <List dense={dense}>
          {documents &&
            documents.map((doc) => {
              return (
                <ListItem
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
                        color="error"
                        edge="end"
                        aria-label="edit"
                        sx={{ ml: 3 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ ml: 3, mr: 2 }}
                        color="error"
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete />
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
  );
};

export default ManageDocs;
