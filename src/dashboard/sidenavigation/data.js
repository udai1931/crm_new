import HomeIcon from './icons/home';
import MediasIcon from './icons/medias';
import ContactIcon from './icons/contact';
import ServersIcon from './icons/servers';
import TerminalIcon from './icons/terminal';
import SettingsIcon from './icons/settings';
import RecycleBinIcon from './icons/recycle-bin';
import DocumentationIcon from './icons/documentation';
import UploadIcon from './icons/Upload.svg'
 
const data = [
  {
    title: 'Users',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Performance',
    icon: <MediasIcon />,
    link: '/performance',
  },
  {
    title: 'Sales',
    icon: <ContactIcon />,
    link: '/admin/sales',
  },
  {
    title: 'Attendance',
    icon: <DocumentationIcon />,
    link: '/admin/attendance',
  },
  {
    title: 'Marketing',
    icon: <ServersIcon />,
    link: '/admin/marketing',
  },
  // {
  //   title: 'Settings',
  //   icon: <SettingsIcon />,
  //   link: '/admin/settings',
  // },
  {
    title: 'Upload',
    icon: <TerminalIcon />,
    link: '/admin/upload',
  },
  // {
  //   title: 'Recycle Bin',
  //   icon: <RecycleBinIcon />,
  //   link: '/admin/recycle-bin',
  // },
  // {
  //   title: 'Documentation',
  //   icon: <DocumentationIcon />,
  //   link: '/admin/documentation',
  // },
];

export default data;
