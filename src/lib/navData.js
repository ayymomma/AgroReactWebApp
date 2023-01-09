import HomeIcon from '@mui/icons-material/Home';
import { Dashboard, Person, DocumentScannerRounded, Terrain } from '@mui/icons-material';
  
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <Dashboard/>,
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: <Person/>,
        text: "Persons",
        link: "/persons"
    },
    {
        id: 3,
        icon: <DocumentScannerRounded/>,
        text: "Contracts",
        link: "/contracts"
    },
    {
        id: 4,
        icon: <Terrain/>,
        text: "Fields",
        link: "/fields"
    }
]