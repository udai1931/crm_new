import React, { useEffect } from 'react'
import DashboardProvider from '../../src/dashboard/provider/context'
import Overlay from '../../src/dashboard/provider/overlay'
import TopNavigation from '../../src/dashboard/topnavigation'
import SideNavigation from '../../components/employeeSideNavigation'
import { useToggle } from '../../src/dashboard/provider/context'
import { useRouter } from 'next/router'
import { sideBarAtom } from '../../state/state'
import Attendance from './attendance'
import Rating from './rating'
import Health from './health'
import Happiness from './happiness'
import Breaks from './breaks'
import Profile from './profile'
import { useRecoilState } from 'recoil'
import { employeeSideBarAtom } from '../../state/employeeState'
import axios from 'axios'
import { employeeDayAtom } from '../../state/employeeState'

const Dashboardstyle = {
    container: `h-screen overflow-hidden relative`,
    mainContainer: `bg-body flex flex-col h-screen pl-0 w-full lg:w-99`,
    main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`,
};

function index() {
    const { open, ref } = useToggle();
    const { asPath } = useRouter();

    const [select, setSelect] = useRecoilState(employeeSideBarAtom);
    const [employeeDay, setEmployeeDay] = useRecoilState(employeeDayAtom);

    const showCommponent = (select) => {
        if (select == "Attendance") {
            return <Attendance />
        } else if (select == "Profile") {
            return <Profile />
        } else if (select == "Breaks") {
            return <Breaks />
        } else if (select == "Health") {
            return <Health />
        } else if (select == "Happiness") {
            return <Happiness />
        } else if (select == "Rating"){
            return <Rating/>
        }
    }

    const getEmployeeDayData = async () => {
        const url = "http://192.168.1.159:8080/api/employee";
        const token = localStorage.getItem("pepcoding_token");
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response.data);
        if (response?.data?.day && response?.data?.day?.length > 0) setEmployeeDay(response.data.day[0]);
    }

    useEffect(() => {
        getEmployeeDayData();
    }, [])

    return (
        <DashboardProvider>
            <div className={Dashboardstyle.container}>
                <div className="flex items-start">
                    <Overlay />
                    <SideNavigation mobilePosition="right" />
                    <div className={Dashboardstyle.mainContainer}>
                        <TopNavigation />
                        <main className={Dashboardstyle.main}>
                            {
                                showCommponent(select)
                            }
                        </main>
                    </div>
                </div>
            </div>
        </DashboardProvider>
    )
}

export default index


// {/* <>
//             {
//                 day_id == "" ? <div className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded mt-4 h-10"> Please Check In from Attendance First</div> :
//                     <div className="lg:col-span-2 mt-4">
//                         <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Breaks</h2>
//                         {/* <button type="button" class="bg-rose-600" disabled>
//                 <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                 </svg>
//                 Processing
//             </button> */}
//                         <div className="mb-4">
//                             <div className="flex justify-around">
//                                 <div className="mb-4 text-xl font-bold leading-7 text-gray-900">Start Time</div>
//                                 <div className="mb-4 text-xl font-bold leading-7 text-gray-900">End Time</div>
//                             </div>
//                             <div className="flex h-56 overflow-auto">
//                                 <div className="w-3/6 text-center">
//                                     {
//                                         breakss?.length == 0 ? <div>No Breaks Today 😃</div> : breakss?.map((breaks) => (
//                                             <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.out_time}</p></div>
//                                         ))
//                                     }
//                                     {/* <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div> */}
//                                 </div>
//                                 <div className="w-3/6 text-center">
//                                     {
//                                         breakss.map((breaks) => (
//                                             <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.in_time}</p></div>
//                                         ))
//                                     }
//                                     {/* <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
//                         <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div> */}
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5"> */}

//                         {/* <div className="md:col-span-5">
//                     <label htmlFor="full_name">Full Name</label>
//                     <input type="text" name="full_name" id="full_name" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" />
//                 </div>

//                 <div className="md:col-span-5">
//                     <label htmlFor="email">Email Address</label>
//                     <input type="text" name="email" id="email" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="email@domain.com" />
//                 </div>

//                 <div className="md:col-span-3">
//                     <label htmlFor="address">Address / Street</label>
//                     <input type="text" name="address" id="address" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label htmlFor="city">City</label>
//                     <input type="text" name="city" id="city" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label htmlFor="country">Country / region</label>
//                     <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
//                         <input name="country" id="country" placeholder="Country" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" defaultValue="" />
//                         <button tabIndex="-1" className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
//                             <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                                 <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                         </button>
//                         <button tabIndex="-1" for="show_more" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
//                             <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label htmlFor="state">State / province</label>
//                     <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
//                         <input name="state" id="state" placeholder="State" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" defaultValue="" />
//                         <button tabIndex="-1" className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
//                             <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                                 <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                         </button>
//                         <button tabIndex="-1" for="show_more" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
//                             <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoinlinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="md:col-span-1">
//                     <label htmlFor="zipcode">Zipcode</label>
//                     <input type="text" name="zipcode" id="zipcode" className="flex items-center w-full h-10 px-4 mt-1 transition-all border rounded outline-none bg-gray-50" placeholder="" defaultValue="" />
//                 </div>

//                 <div className="md:col-span-5">
//                     <div className="inline-flex items-center">
//                         <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
//                         <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
//                     </div>
//                 </div> */}
//                         <div className="text-right md:col-span-5">
//                             <div className="inline-flex items-end gap-4">
//                                 {
//                                     total!=0 &&
//                                         <div className="pr-10 pb-5">
//                                         Total Breaks : {Math.floor(total/(60*60))} hr {Math.floor((total-Math.floor(total/(60*60))*3600)/60)} min {total%60} sec
//                                         </div>
//                                 }

//                                 {/* <button
//                         onClick={startBreakTime} disabled={breakStarted}
//                         className="px-4 py-2 font-bold text-white bg-pink-500 rounded">Start Break</button> */}

//                             </div>
//                         </div>

//                         <div className="text-right md:col-span-5">
//                             <div className="inline-flex items-end gap-4">
//                                 {
//                                     breakStarted ?
//                                         <>
//                                             <button disabled={true}
//                                                 className="px-4 py-2 font-bold text-white bg-red-600 rounded animate-pulse hover:bg-red-800 mb-5">On going Break</button>
//                                             <button
//                                                 onClick={endBreakTime}
//                                                 className="px-4 py-2 font-bold text-white bg-green-500 rounded mb-5">End Break</button>
//                                         </> :
//                                         <button
//                                             onClick={startBreakTime}
//                                             className="px-4 py-2 font-bold text-white bg-pink-500 rounded mb-5">Start Break</button>
//                                 }

//                                 {/* <button
//                         onClick={startBreakTime} disabled={breakStarted}
//                         className="px-4 py-2 font-bold text-white bg-pink-500 rounded">Start Break</button> */}

//                             </div>
//                         </div>

//                         {/* </div> */}
//                     </div>
//             }
//         </> */}