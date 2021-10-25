import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectedUser, day, health, rating, day_id, personalAtom } from "../state/profileState";
import { useRecoilState, useRecoilValue } from "recoil";
import {  ipAtom } from "../state/state";

const Attendance = () => {
    const sUser = useRecoilValue(selectedUser);
    const ip = useRecoilValue(ipAtom);
    const [userDay, setUserDay] = useRecoilState(day);
    const [userHealth, setUserHealth] = useRecoilState(health);
    const [userRating, setUserRating] = useRecoilState(rating);
    const [userDayID, setUserDayID] = useRecoilState(day_id);
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [firstHalf, setFirstHalf] = useState(false);
    const [secondHalf, setSecondHalf] = useState(false);
    const [present, setPresent] = useState(false)
    const [checkedIn, setCheckedIn] = useState(null)
    const [checkedOut, setCheckedOut] = useState(null)

    const getData = async () => {
        try {
            const { user_id } = sUser;
            console.log(user_id)
            const url = `${ip}/api/day/getToday`;
            const token = localStorage.getItem("pepcoding_token");
            let time = new Date()
            const response = await axios.post(url, {
                today: time,
                user_id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response.data)
            let data = response.data.day
            if (response.data.day == null) {
                setPresent(false)
            } else {
                setPresent(true)
                if (data.in_time != null)
                    // console.log(data.in_time)
                    // setInTime(data.in_time.toISOString().slice(0, 16))
                    setCheckedIn(data.in_time)
                if (response.data.day.out_time != null)
                    setOutTime(data.out_time)

                console.log(data.out_time)
                setCheckedOut(data.out_time)
                if (data.first_half)
                    setFirstHalf(data.first_half)
                if (data.second_half)
                    setSecondHalf(data.second_half)
                if (data?.day) {
                    setUserDay(data.day);
                    setUserDayID(data.day.day_id)
                    console.log(userDay);

                }
                if (data?.health) setUserHealth(data.health);
                if (data?.rating) setUserRating(data.rating);
                localStorage.setItem("day_id", data.day_id)
            }
            // if (data) {
            //     if (data?.day) {
            //         setUserDay(data.day);
            //         console.log(userDay);
            //     }
            //     if (data?.health) setUserHealth(data.health);
            //     if (data?.rating) setUserRating(data.rating);
            // }
            // console.log(userDay)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const markInTimeRequest = async () => {
        console.log("in time marking")
        try {
            const { user_id } = sUser;
            const url = `${ip}/api/day/markInTime`;
            const token = localStorage.getItem("pepcoding_token");
            // console.log(user_id, token);
            // if (!inTime || !token) return;
            const response = await axios.post(url, {
                in_time: new Date(),
                user_id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)

            let data = response?.data;
            if (data) {
                if (data?.day) {
                    setUserDay(data.day);
                    // console.log(userDay);
                    // localStorage.setItem("data.day.day_id")
                    setUserDayID(data.day.day_id)
                }
                if (data?.health) setUserHealth(data.health);
                if (data?.rating) setUserRating(data.rating)
            }
            console.log(userDay)
            // set local storage
        } catch (err) {
            console.log(err);
        }
        getData()
    }

    const handleSubmit = async () => {
        console.log(userDayID)
        console.log("in time marking")
        try {
            const { user_id } = sUser;
            const url = `${ip}/api/day/markHalfs`;
            const token = localStorage.getItem("pepcoding_token");
            // console.log(user_id, token);
            // if (!inTime || !token) return;
            const response = await axios.post(url, {
                // in_time: inTime,
                day_id: userDayID,
                first_half: firstHalf,
                second_half: secondHalf
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = response?.data;
            if (data) {
                if (data?.day) {
                    setUserDay(data.day);
                    console.log(userDay);
                }
                if (data?.health) setUserHealth(data.health);
                if (data?.rating) setUserRating(data.rating);
            }
            console.log(userDay)
        } catch (err) {
            console.log(err);
        }
    }

    const markOutTimeRequest = async () => {
        const { user_id } = sUser
        console.log("worfking")
        try {
            const url = `${ip}/api/day/markOutTime`;
            const token = localStorage.getItem("pepcoding_token");
            console.log(user_id, token);
            // if (!inTime || !token) return;
            console.log(outTime, userDay)
            const response = await axios.post(url, {
                out_time: new Date(),
                user_id: user_id,
                day_id: localStorage.getItem("day_id")
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response?.data);
            // setCheckedOut(response)
            getData()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mt-4 lg:col-span-2 ">
            <h2 className="mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Attendance</h2>
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                {/* <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input type="text" name="full_name" id="full_name" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" />
                </div> */}
                <div className="md:col-span-5">
                    {
                        !present ? <div className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded">Absent</div> : <div className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Present Today</div>
                    }
                    <br />
                    {
                        checkedIn && <div className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Check In : {checkedIn}</div>
                    }
                    <br />
                    {
                        checkedOut && <div className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Check Out : {checkedOut}</div>
                    }
                    {/* <input
                    value={inTime}
                    onChange={(e) => setInTime(e.currentTarget.value)}
                    type="datetime-local" name="in-time" id="in-time" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" placeholder="email@domain.com" />
                <button
                    // onClick={markInTimeRequest}
                    className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Set In-time</button> */}
                </div>
                <div className="md:col-span-5">
                    {/* <label htmlFor="in-time">Check In</label> */}
                    {/* <input
                        value={inTime}
                        onChange={(e) => setInTime(e.currentTarget.value)}
                        type="datetime-local" name="in-time" id="in-time" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" placeholder="email@domain.com" /> */}
                    {!present && checkedIn == null &&
                        <button
                            onClick={markInTimeRequest}
                            className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Check In</button>
                    }
                </div>
                <div className="md:col-span-5">
                    {/* <label htmlFor="out-time">Check Out</label> */}
                    {/* <input
                        value={outTime}
                        onChange={(e) => setOutTime(e.currentTarget.value)}
                        type="datetime-local" name="out-time" id="out-time" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" placeholder="email@domain.com" /> */}
                    {
                        present && checkedOut == null &&
                        <button
                            onClick={markOutTimeRequest}
                            className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-700">Check Out</button>
                    }
                </div>

                {/* <div className="md:col-span-3">
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
                </div> */}

                {
                    present &&
                    <>


                        <div className="md:col-span-5">
                            <div className="inline-flex items-center">
                                <input
                                    checked={firstHalf}
                                    onChange={() => setFirstHalf(!firstHalf)}
                                    type="checkbox" name="first_half" id="first_half" className="form-checkbox" />
                                <label htmlFor="first_half" className="ml-2">First Half</label>
                            </div>
                        </div>
                        <div className="md:col-span-5">
                            <div className="inline-flex items-center">
                                <input
                                    checked={secondHalf}
                                    onChange={() => setSecondHalf(!secondHalf)}
                                    type="checkbox" name="second_half" id="second_half" className="form-checkbox" />
                                <label htmlFor="second_half" className="ml-2">Second Half</label>
                            </div>
                        </div>

                        <div className="text-right md:col-span-5">
                            <div className="inline-flex items-end">
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Save Halfs Attendance</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Attendance;