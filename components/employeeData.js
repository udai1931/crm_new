import ContactIcon from "../src/dashboard/sidenavigation/icons/contact"; 
import SettingsIcon from "../src/dashboard/sidenavigation/icons/settings";
import TerminalIcon from "../src/dashboard/sidenavigation/icons/terminal";
import RecycleBinIcon from "../src/dashboard/sidenavigation/icons/recycle-bin";
import DocumentationIcon from "../src/dashboard/sidenavigation/icons/documentation";
import MediasIcon from "../src/dashboard/sidenavigation/icons/medias";
//users //performance //sales //marketing

const data = [
  {
    title: 'Profile',
    icon: <ContactIcon />,
    link: '/employee/profile',
  },
  {
    title: 'Attendance',
    icon: <SettingsIcon />,
    link: '/employee/attendance',
  },
  {
    title: 'Breaks',
    icon: <TerminalIcon />,
    link: '/employee/breaks',
  },
  {
    title: 'Health',
    icon: <RecycleBinIcon />,
    link: '/employee/health',
  },
  {
    title: 'Happiness',
    icon: <DocumentationIcon />,
    link: '/employee/happiness',
  },
  {
    title: 'Rating',
    icon: <MediasIcon />,
    link: '/employee/rating',
  },
];

export default data;
