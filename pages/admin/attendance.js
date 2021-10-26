import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { ipAtom } from '../../state/state';

function Attendance() {
    const [departmentData, setDepartmentData] = useState({});
    const [dayData, setDayData] = useState({});
    const ip = useRecoilValue(ipAtom)
    const markInTimeRequest = async (user_id, userIdx) => {
        try {

            const url = `${ip}/api/day/markInTime`;
            const token = localStorage.getItem("pepcoding_token");
            const response = await axios.post(url, {
                in_time: new Date(),
                user_id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response, "intime ");
            getDepartmentMembers();
            // getData(user_id, userIdx, "in_time")
            // show notification
            // if (Notification.permission === "granted") {
            //     const notification = new Notification("Attendance", {
            //         body: "You have successfully marked in time",
            //     })
            // } else {

            // }
            // alert(Notification.permission)
        } catch (err) {
            console.log(err);
        }
    }
    const markOutTimeRequest = async (user_id, userIdx, day_id) => {
        console.log(day_id)
        try {
            const url = `${ip}/api/day/markOutTime`;
            const token = localStorage.getItem("pepcoding_token");
            const response = await axios.post(url, {
                out_time: new Date(),
                user_id: user_id,
                day_id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response?.data);
            getDepartmentMembers()
        } catch (err) {
            console.log(err);
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const getData = async (user_id, userIdx, time) => {
        try {
            const url = `${ip}/api/day/getToday`;
            const token = localStorage.getItem("pepcoding_token");
            const response = await axios.post(url, {
                today: new Date(),
                user_id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response.data);
            if (response?.data?.day?.[time]) {
                let newDepartmentData = { ...departmentData };
                newDepartmentData.users[userIdx].Days.push({});
                newDepartmentData.users[userIdx].Days[0][time] = response.data.day[time];
                setDepartmentData(newDepartmentData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getDepartmentMembers = async () => {
        try {
            let url = `${ip}/api/department/getDepartmentMembers`;
            const token = localStorage.getItem("pepcoding_token");
            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })

            console.log(1234, response.data);
            if (response?.data?.departmentMembers) setDepartmentData(response.data.departmentMembers);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        getDepartmentMembers();
    }, [])

    return (
        <div>
            {
                (!departmentData?.users || departmentData.users.length === 0)
                    ? <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl">Oops!! No Data @ the moment..</h2>
                    : <div className="max-w-full">
                        <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 uppercase sm:text-3xl">{departmentData.name}</h2>
                        {/* Table */}
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            NAME
                                        </th>
                                        {/* <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            FIRST HALF
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            SECOND HALF
                                        </th> */}
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            IN TIME
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            OUT TIME
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        departmentData?.users.map((user, idx) => {
                                            return (
                                                <tr className="h-10" key={idx}>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.user_id}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.name}
                                                        </p>
                                                    </td>
                                                    {/* <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            <input
                                                                type="checkbox" defaultChecked={false} className="form-checkbox" />
                                                        </p>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            <input
                                                                type="checkbox" defaultChecked={false} className="form-checkbox" />
                                                        </p>
                                                    </td> */}
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {console.log(formatDate(new Date()))}
                                                            {
                                                                (user.Days.length > 0 && user?.Days[user.Days.length - 1]?.today == formatDate(new Date()) && user?.Days[user.Days.length - 1]?.in_time) ? user?.Days[user.Days.length - 1]?.in_time : <button
                                                                    onClick={() => markInTimeRequest(departmentData.users[idx].user_id, idx)}
                                                                    className="px-4 py-2 font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-700">CHECK IN</button>
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {
                                                                // user?.Days[0]?.out_time || <button
                                                                (user.Days.length > 0 && user?.Days[user.Days.length - 1]?.today == formatDate(new Date()) && user?.Days[user.Days.length - 1]?.out_time) ? user?.Days[user.Days.length - 1]?.out_time : <button
                                                                    onClick={() => markOutTimeRequest(departmentData.users[idx].user_id, idx, user?.Days[user.Days.length - 1]?.day_id)}
                                                                    className="px-4 py-2 font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-700">CHECK OUT</button>
                                                            }
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Attendance