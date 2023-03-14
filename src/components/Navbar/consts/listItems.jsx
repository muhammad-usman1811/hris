import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export const listItems = [
    {
        id: 0,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        routel: '',
    },
    {
        id: 1,
        icon: <PeopleIcon />,
        label: 'Employees',
        routel: 'employees',
    },
    {
        id: 2,
        icon: <PersonIcon />,
        label: 'Attendance',
        routel: 'attendance',
    },
    {
        id: 3,
        icon: <ManageAccountsIcon />,
        label: 'Manage Leaves',
        routel: 'manage-leaves',
    },
    {
        id: 4,
        icon: <ClearAllIcon />,
        label: 'Manage Documents',
        routel: 'manage-documents',
    }, 
]