import React, { useEffect } from "react";
import { profileTabAtom } from '../../state/state'
import { useRecoilState, useRecoilValue } from 'recoil';
import Personal from "../../components/Personal";
import Happiness from "../../components/Happiness";
import Breaks from "../../components/Breaks";
import Attendance from "../../components/Attendance";
import { selectedUser } from "../../state/profileState";
import axios from 'axios'
import Rating from "../../components/Rating";
import Health from "../../components/Health";


const Profile = () => {
    const [navigationValue, setNavigationValue] = useRecoilState(profileTabAtom);
    const sUser = useRecoilValue(selectedUser);

    const getData = async () => {
        try {
            const { user_id } = sUser;
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
            console.log(response)
            if (response.data.day == null) {
                //No work
            } else {
                localStorage.setItem("day_id", response.data.day.day_id)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleProfileTabs = () => {
        console.log(navigationValue);
        if (navigationValue === "Profile") return <Personal />
        else if (navigationValue === "Happiness") return <Happiness />
        else if (navigationValue === "Breaks") return <Breaks />
        else if (navigationValue === "Attendance") return <Attendance />
        else if (navigationValue === "Rating") return <Rating />
        else if (navigationValue === "Health") return <Health />
    }

    const handleNavigationValue = (e) => {
        setNavigationValue(e.currentTarget.innerText);
    }

    useEffect(() => {
        console.log("aa gya")
        //route
        getData();
        // localStorage.setItem("day_id",)
        return () => {
            setNavigationValue("Attendance")
            localStorage.setItem("day_id", "")
            console.log("chla gya")
        }
    }, [])

    return (
        <div>
            <div className="m-auto max-w-screen-lg">
                <div>
                    <div className="px-4 bg-white rounded shadow-lg md">
                        <div className="pt-4 pb-8 items-center gap-4 grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                            <div className="w-auto h-auto text-gray-600 sm:w-full md:flex md:justify-around lg:block">
                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50 ">Attendance</p>
                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50">Profile</p>
                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50">Happiness</p>
                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50">Breaks</p>

                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50">Rating</p>
                                <p
                                    onClick={handleNavigationValue}
                                    className="flex items-center justify-center h-12 text-lg font-medium text-center border-b-2 cursor-pointer hover:bg-blue-50">Health</p>
                            </div>
                            {
                                handleProfileTabs()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;