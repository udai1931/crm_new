import React from 'react'
// import Table from './table'
import DashboardProvider from '../../src/dashboard/provider/context'
import Overlay from '../../src/dashboard/provider/overlay'
import TopNavigation from '../../src/dashboard/topnavigation'
import SideNavigation from '../../components/HddSideNavigation.js'
import { useToggle } from '../../src/dashboard/provider/context'
import { useRouter } from 'next/router'
import Content from './table'
import Attendance from './attendance'
import { useRecoilState } from 'recoil'
import { sideBarAtom } from '../../state/state'
import Profile from './profile'

const Dashboardstyle = {
    container: `h-screen overflow-hidden relative`,
    mainContainer: `bg-body flex flex-col h-screen pl-0 w-full lg:w-99`,
    main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`,
};

function index() {
    const { open, ref } = useToggle();
    const { asPath } = useRouter();
    const [select, setSelect] = useRecoilState(sideBarAtom)
    let showData = (select) => {
        if (select == "Users") {
            return <Content />
        } else if (select == "Attendance") {
            return <Attendance/>
        } else if (select == "Edit") {
            return <Profile/>
        }
    }
    return (
        <DashboardProvider>
            <div className={Dashboardstyle.container}>
                <div className="flex items-start">
                    <Overlay />
                    <SideNavigation mobilePosition="right" />
                    <div className={Dashboardstyle.mainContainer}>
                        <TopNavigation />
                        <main className={Dashboardstyle.main}>
                            {/* <Table /> */}
                            {
                                showData(select)
                            }
                        </main>
                    </div>
                </div>
            </div>
        </DashboardProvider>
    )
}

export default index