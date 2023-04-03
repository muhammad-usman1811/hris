import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Add, Delete, Visibility } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DocModal from "./DocModal";

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ManageDocs = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

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
          {generate(
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
                  <IconButton
                    sx={{ ml: 3 }}
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
                  <PictureAsPdfOutlinedIcon color="error" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Employee Handbook"
                secondary={secondary ? "employee handbook" : null}
              />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
};

export default ManageDocs;
