import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';

const style = {
  container: `h-screen overflow-hidden relative`,
  mainContainer: `bg-body flex flex-col h-screen pl-0 w-full lg:w-99`,
  main: `bg-gray-100 h-screen pb-36 pt-4 md:px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`,
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <SideNavigation mobilePosition="right" />
          <div className={style.mainContainer}>
            <TopNavigation />
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
