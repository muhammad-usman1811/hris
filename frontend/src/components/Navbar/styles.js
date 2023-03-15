export const navbarStyles = {
  drawer: {
    width: 256,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 256,
      boxSizing: "border-box",
      backgroundColor: "background.paper",
      color: "rgb(76, 84, 92)",
    },
    "& .Mui-selected": {
      backgroundColor: "rgba(211, 47, 47, 0.12)",
      color: "#1976D2",
    },
  },
  icons: {
    color: "rgb(76, 84, 92)!important",
    marginLeft: "20px",
  },
  text: {
    "& span": {
      marginLeft: "-10px",
      fontWeight: "600",
      fontSize: "16px",
    },
  },
};
