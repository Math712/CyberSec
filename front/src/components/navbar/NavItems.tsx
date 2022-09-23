import HomeIcon from '@mui/icons-material/Home';
import TollIcon from '@mui/icons-material/Toll';
import FactoryIcon from '@mui/icons-material/Factory';
import BarChartIcon from '@mui/icons-material/BarChart';
 
export const navItems = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Accueil",
        link: "/home"
    },
    {
        id: 1,
        icon: <TollIcon/>,
        text: "Modèles",
        link: "/modele"
    },
    {
        id: 2,
        icon: <FactoryIcon/>,
        text: "Procédé",
        link: "/procede"
    },
    {
        id: 3,
        icon: <BarChartIcon/>,
        text: "Ingrédients",
        link: "/ingredients"
    }
]