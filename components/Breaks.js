import React, { useState, useEffect } from "react";
import axios from "axios";
import { day_id, personalAtom, selectedUser } from "../state/profileState";
import { useRecoilState, useRecoilValue } from "recoil";
import { ipAtom } from "../state/state";

const Breaks = () => {
    const [sUser, setSUser] = useRecoilState(selectedUser)
    const [breakss, setBreakss] = useState([])
    const [breakStarted, setBreakStarted] = useState(false)
    const [curBreakId, setCurBreakId] = useState('')
    const [total, setTotal] = useState(0)
    const day_id = localStorage.getItem("day_id")
    const ip = useRecoilValue(ipAtom)
    console.log(sUser)
    const startBreakTime = async () => {
        let token = localStorage.getItem("pepcoding_token")
        let data = await axios.post(`${ip}/api/breaks/startBreak`, { day_id: day_id, user_id: sUser.user_id, out_time: new Date() }, { 'headers': { 'Authorization': `Bearer ${token}` } });
        console.log(data.data)
        setCurBreakId(data.data.breakk.break_id)
        updateBreaks()
        setBreakStarted(!breakStarted)
    }
    const endBreakTime = async () => {
        setBreakStarted(!breakStarted)
        let token = localStorage.getItem("pepcoding_token")
        let data = await axios.post(`${ip}/api/breaks/endBreak`, { day_id: day_id, user_id: sUser.user_id, in_time: new Date(), break_id: curBreakId }, { 'headers': { 'Authorization': `Bearer ${token}` } });
        console.log(data.data)
        setCurBreakId('')
        updateBreaks()
        getTotalTime()
    }

    const updateStatus = async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let data = await axios.post(`${ip}/api/breaks/getBreakStatus`, { day_id: day_id, user_id: sUser.user_id }, { 'headers': { 'Authorization': `Bearer ${token}` } });
            if (data.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            console.log(data.data)
            setBreakStarted(data.data.status == 0 ? false : true)
            setCurBreakId(data.data.data.break_id)
        } catch (err) {
            console.log("Error" + err)
        }
    }

    const updateBreaks = async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let data = await axios.post(`${ip}/api/breaks/getAllBreaks`, { day_id: day_id, user_id: sUser.user_id }, { 'headers': { 'Authorization': `Bearer ${token}` } });
            if (data.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            console.log(data.data)
            setBreakss(data.data)
        } catch (err) {
            console.log("Error" + err)
        }
    }

    const getTotalTime = async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let data = await axios.post(`${ip}/api/breaks/getTotalTime`, { day_id: day_id, user_id: sUser.user_id }, { 'headers': { 'Authorization': `Bearer ${token}` } });
            if (data.data.success == 2) {
                // throw new Error("Server Error, No departments found")
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            // if (data.data.success == 0) throw new Error("Server Error, No Breaks found")
            console.log("dindicicnibcibcidbciebcibciebc")
            console.log(data.data)
            setTotal(Number(data.data.data))
            // setBreakss(data.data)
        } catch (err) {
            console.log("Error" + err)
        }
    }

    useEffect(() => {
        updateBreaks()
        updateStatus()
        getTotalTime()
        return () => {
            setTotal(0)
        }
    }, [])

    return (
        <>
            {
                day_id == "" ? <div className="h-10 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded"> Please Check In from Attendance First</div> :
                    <div className="mt-4 lg:col-span-2">
                        <h2 className="mb-4 mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Breaks</h2>
                        {/* <button type="button" class="bg-rose-600" disabled>
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                </svg>
                Processing
            </button> */}
                        <div className="mb-4">
                            <div className="flex justify-around">
                                <div className="mb-4 text-xl font-bold leading-7 text-gray-900">Start Time</div>
                                <div className="mb-4 text-xl font-bold leading-7 text-gray-900">End Time</div>
                            </div>
                            <div className="flex h-56 overflow-auto">
                                <div className="w-3/6 text-center">
                                    {
                                        breakss?.length == 0 ? <div>No Breaks Today 😃</div> : breakss?.map((breaks) => (
                                            <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.out_time}</p></div>
                                        ))
                                    }
                                    {/* <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">12:00</p></div> */}
                                </div>
                                <div className="w-3/6 text-center">
                                    {
                                        breakss.map((breaks) => (
                                            <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.in_time}</p></div>
                                        ))
                                    }
                                    {/* <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div>
                        <div><p className="inline-block p-1 mb-2 text-base bg-purple-300 rounded-md">12:00</p></div> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5"> */}

                        {/* <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input type="text" name="full_name" id="full_name" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" />
                </div>

                <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" id="email" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="email@domain.com" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input type="text" name="address" id="address" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                        <input name="country" id="country" placeholder="Country" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" defaultValue="" />
                        <button tabIndex="-1" className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button tabIndex="-1" for="show_more" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                        <input name="state" id="state" placeholder="State" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" defaultValue="" />
                        <button tabIndex="-1" className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button tabIndex="-1" for="show_more" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoinlinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" className="flex items-center w-full h-10 px-4 mt-1 transition-all border rounded outline-none bg-gray-50" placeholder="" defaultValue="" />
                </div>

                <div className="md:col-span-5">
                    <div className="inline-flex items-center">
                        <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                        <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                    </div>
                </div> */}
                        <div className="text-right md:col-span-5">
                            <div className="inline-flex items-end gap-4">
                                {
                                    total != 0 &&
                                    <div className="pb-5 pr-10">
                                        Total Breaks : {Math.floor(total / (60 * 60))} hr {Math.floor((total - Math.floor(total / (60 * 60)) * 3600) / 60)} min {total % 60} sec
                                    </div>
                                }

                                {/* <button
                        onClick={startBreakTime} disabled={breakStarted}
                        className="px-4 py-2 font-bold text-white bg-pink-500 rounded">Start Break</button> */}

                            </div>
                        </div>

                        <div className="text-right md:col-span-5">
                            <div className="inline-flex items-end gap-4">
                                {
                                    breakStarted ?
                                        <>
                                            <button disabled={true}
                                                className="px-4 py-2 mb-5 font-bold text-white bg-red-600 rounded animate-pulse hover:bg-red-800">On going Break</button>
                                            <button
                                                onClick={endBreakTime}
                                                className="px-4 py-2 mb-5 font-bold text-white bg-green-500 rounded">End Break</button>
                                        </> :
                                        <button
                                            onClick={startBreakTime}
                                            className="px-4 py-2 mb-5 font-bold text-white bg-pink-500 rounded">Start Break</button>
                                }

                                {/* <button
                        onClick={startBreakTime} disabled={breakStarted}
                        className="px-4 py-2 font-bold text-white bg-pink-500 rounded">Start Break</button> */}

                            </div>
                        </div>

                        {/* </div> */}
                    </div>
            }
        </>
    );
}

export default Breaks;