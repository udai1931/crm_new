import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { day_id, selectedUser } from "../state/profileState";
import axios from 'axios'
import { ipAtom } from "../state/state";

const Happiness = () => {
    const [happinessData, setHappinessData] = useState({});
    const day_id = localStorage.getItem("day_id")
    const ip = useRecoilValue(ipAtom)
    const fetchHapinessData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/happiness/${day_id}`;
            const token = localStorage.getItem("pepcoding_token")

            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            setHappinessData(response?.data?.happiness);
        } catch (err) {
            console.log(err)
            console.log("ERROR in fetching User");
        }
    }
    const postHapinessData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/happiness`;
            const token = localStorage.getItem("pepcoding_token")
            console.log(day_id, happinessData)

            let response = await axios.post(url, {
                day_id,
                ...happinessData
            }, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });
            console.log(response.data);
            setHappinessData(response?.data?.happiness);
        } catch (err) {
            console.log("ERROR in fetching User");
        }
    }

    useEffect(() => {
        fetchHapinessData();
    }, [])

    const handleChange = (e) => {
        setHappinessData({ ...happinessData, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        console.log(happinessData)
    }, [happinessData])

    return (
        <>
            {
                day_id == "" ? <div className="h-10 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded"> Please Check In from Attendance First</div> :
                    <div className="mt-4 lg:col-span-2">
                        <h2 className="mb-4 mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Happiness</h2>
                        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">

                            <div className="md:col-span-2">
                                <label htmlFor="programming">Programming</label>

                                <input type="number" min="0" max="5" name="programming" id="programming" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={happinessData?.programming} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="english">English</label>
                                <input type="number" min="0" max="5" name="english" id="english" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={happinessData?.english} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="gym">Gym</label>
                                <input type="number" min="0" max="5" name="gym" id="gym" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={happinessData?.gym} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="performance">Performance</label>
                                <input type="number" min="0" max="5" name="performance" id="performance" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={happinessData?.performance} onChange={handleChange} />
                            </div>
                            <div className="text-right md:col-span-5">
                                <div className="inline-flex items-end">
                                    <button className="px-4 py-2 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={postHapinessData}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Happiness;