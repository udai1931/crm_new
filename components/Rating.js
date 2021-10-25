import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { ipAtom } from '../state/state';

export default function Rating() {
    const day_id = localStorage.getItem("day_id")
    const [ratingData, setRatingData] = useState({})
    const ip = useRecoilValue(ipAtom)
    const handleChange = (e) => {
        setRatingData({ ...ratingData, [e.target.name]: e.target.value })
    }

    const fetchRatingData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/rating/${day_id}`;
            const token = localStorage.getItem("pepcoding_token")

            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            setRatingData({ ...response.data.rating });
        } catch (err) {
            console.log(err)
            console.log("ERROR in fetching Rating");
        }
    }
    const postRatingData = async () => {
        // console.log(dayId)
        try {
            const url = `${ip}/api/rating`;
            const token = localStorage.getItem("pepcoding_token")
            // console.log(day_id, happinessData)

            let response = await axios.post(url, {
                day_id,
                ...ratingData
            }, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });
            console.log(response.data);
            setRatingData(response?.data?.rating);
        } catch (err) {
            console.log("ERROR in Setting Rating", err);
        }
    }

    useEffect(() => {
        fetchRatingData()
    }, [])

    return (
        <>
            {
                day_id == "" ? <div className="h-10 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded"> Please Check In from Attendance First</div> :
                    <div className="mt-4 lg:col-span-2">
                        <h2 className="mb-4 mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Rating</h2>
                        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                            <div className="md:col-span-2">
                                <label htmlFor="programming">Rating of the Day</label>

                                <input type="number" min="0" max="5" name="rating_of_the_day" id="rating_of the_day" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={ratingData?.rating_of_the_day} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-4">
                                <label htmlFor="english">Remarks</label>
                                <input type="text" min="0" max="5" name="remark" id="remark" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" value={ratingData?.remark} onChange={handleChange} />
                            </div>

                            <div className="text-right md:col-span-5">
                                <div className="inline-flex items-end">
                                    <button className="px-4 py-2 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                        onClick={postRatingData}
                                    >Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
