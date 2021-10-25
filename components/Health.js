import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { ipAtom } from '../state/state';

export default function Health() {
    const day_id = localStorage.getItem("day_id")
    const [healthData, setHealthData] = useState({})
    const ip = useRecoilValue(ipAtom)
    const handleChange = (e) => {
        setHealthData({ ...healthData, [e.target.name]: e.target.value })
    }

    const fetchHealthData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/health/${day_id}`;
            const token = localStorage.getItem("pepcoding_token")

            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            setHealthData(response?.data?.health);
        } catch (err) {
            console.log(err)
            console.log("ERROR in fetching Health");
        }
    }
    const postHealthData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/health`;
            const token = localStorage.getItem("pepcoding_token")
            // console.log(day_id, happinessData)

            let response = await axios.post(url, {
                day_id,
                ...healthData
            }, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });
            console.log(response.data);
            setHealthData(response?.data?.health);
        } catch (err) {
            console.log("ERROR in Setting Health");
        }
    }

    useEffect(() => {
        fetchHealthData()
    }, [])

    return (
        <>
            {
                day_id == "" ? <div className="h-10 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded"> Please Check In from Attendance First</div> :
                    <div className="mt-4 lg:col-span-2">
                        <h2 className="mb-4 mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Health</h2>
                        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                            <div className="md:col-span-4">
                                <label htmlFor="programming">Morning Temp</label>

                                <input type="number" min="0" name="morning_temperature" id="morning_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={healthData?.morning_temperature} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-4">
                                <label htmlFor="english">Evening Temperature</label>
                                <input type="number" min="0" max="5" name="evening_temperature" id="evening_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={healthData?.evening_temperature} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-4">
                                <label htmlFor="english">Covid Symptoms</label>
                                <input type="text" min="0" max="5" name="covid_symptoms" id="covid_symptoms" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={healthData?.covid_symptoms} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-4">
                                <label htmlFor="english">Mask Wearing Rating</label>
                                <input type="number" min="0" max="5" name="mask_wearing_rating" id="evening_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={healthData?.mask_wearing_rating} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-4">
                            </div>
                            <div className="text-right md:col-span-5">
                                <div className="inline-flex items-end">
                                    <button className="px-4 py-2 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={postHealthData}
                                    >Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}
