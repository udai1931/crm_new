import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRecoilState, useRecoilValue } from "recoil";
import { personalAtom, selectedUser } from "../state/profileState";
import { ipAtom } from "../state/state";

const Personal = () => {
    const [personalData, setPersonalData] = useState({});
    const [oldData, setOldData] = useState({});
    const sUser = useRecoilValue(selectedUser);
    const [save, setSave] = useState(false)
    const [deps, setDeps] = useState([])
    const day_id = localStorage.getItem("day_id")
    const ip = useRecoilValue(ipAtom)
    useEffect(async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let data = await axios.get(`${ip}/api/department`,
                {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    }
                });
            if (data.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            if (data.data.success == 0) throw new Error("Server Error, No departments found")
            // console.log(data.data.data)
            setDeps(data.data.data)
        } catch (err) {
            console.log("Error" + err)
        }
    }, [])

    const checkEqual = () => {
        if (JSON.stringify(personalData) === JSON.stringify(oldData)) {
            setSave(false)
        } else {
            setSave(true)
        }
        setOldData(personalData)
    }

    useEffect(() => {
        checkEqual()
    }, [personalData])

    const getPersonalData = async () => {
        try {
            let { user_id } = sUser;
            const url = `${ip}/api/users/${user_id}`;
            const token = localStorage.getItem("pepcoding_token");

            let response = await axios(url, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });

            console.log(response.data);
            if (response?.data?.user) {
                setOldData(response.data.user);
                setPersonalData(response.data.user);
            }
        } catch (err) {
            console.log("ERROR in fetching User");
        }
    }

    const postPersonalData = async () => {
        try {
            const url = `${ip}/api/users/update/${sUser.user_id}`;
            const token = localStorage.getItem("pepcoding_token");
            let response = await axios.post(url, personalData, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });
            console.log(response?.data);
        } catch (err) {
            console.log(err);
        }
        getPersonalData()
    }

    useEffect(() => {
        getPersonalData();
    }, [])

    const handlePersonalData = (e) => {
        if (e.target.name == "department") {
            setPersonalData({ ...personalData, Department: { ...personalData.Department, name: e.target.name, department_id: e.target.value }, "department_id": e.target.value })
        } else {
            setPersonalData({ ...personalData, [e.target.name]: e.target.value })
        }
        console.log(personalData)
    }
    console.log(day_id)
    return (
        <div className="mt-4 lg:col-span-2">
            <h2 className="mb-4 mb-6 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">Profile</h2>
            {
                day_id == "" && <div className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded">Please Check in First</div>
            }
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="name">Full Name</label>
                    <input
                        value={personalData?.name}
                        onChange={handlePersonalData}
                        type="text" name="name" id="name" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" />
                </div>

                <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                        value={personalData?.email}
                        onChange={handlePersonalData}
                        type="text" name="email" id="email" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="email@domain.com" />
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                        value={personalData?.address}
                        onChange={handlePersonalData}
                        type="text" name="address" id="address" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="salary">Salary</label>
                    <input
                        value={personalData?.salary}
                        onChange={handlePersonalData}
                        type="number" min="0" max="5" name="salary" id="salary" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue="" placeholder="" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="Department">Department</label>
                    <select
                        // value={personalData?.Department?.name}
                        onChange={handlePersonalData}
                        type="text" name="department" id="Department" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50">
                        {
                            deps.map((dep) => (
                                <option value={dep.department_id}>{dep.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="role">Role</label>
                    <select
                        // value={personalData?.Department?.name}
                        onChange={handlePersonalData}
                        type="text" name="role" id="role" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50">
                        <option>Admin</option>
                        <option>Team Lead</option>
                        <option>Employee</option>
                        <option>Semi Admin</option>
                    </select>
                </div>

                <div className="text-right md:col-span-5">
                    <div className="inline-flex items-end">
                        {
                            save &&
                            <button
                                onClick={postPersonalData}
                                className="px-4 py-2 mb-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Save Changes</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Personal;