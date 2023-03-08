import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const navbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Employees",
    route: "/employees",
  },
  {
    id: 2,
    icon: <PersonIcon />,
    label: "Attendance",
    route: "/attendance",
  },
  {
    id: 3,
    icon: <ManageAccountsIcon />,
    label: "Leave Requests",
    route: "/leaves",
  },
  {
    id: 4,
    icon: <ArticleIcon />,
    label: "Manage Docs",
    route: "/docs",
  },
];

export default navbarItems;
