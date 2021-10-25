import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import { sideBarAtom, userAtom } from "../../state/state";
import { selectedUser } from "../../state/profileState";

const Content = () => {
    const [select, setSelect] = useRecoilState(sideBarAtom)
    const [sUser, setSUser] = useRecoilState(selectedUser);
    const [department, setDepartment] = useState("")
    const [text, setText] = useState("")
    const [users, setUsers] = useState([])
    const [currentDepartment, setCurrentDepartment] = useState(0)
    const [currentRole, setCurrentRole] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [pageArr, setPageArr] = useState([])
    const [showModal, setShowModal] = useState("")
    const [delModal, setDelModal] = useState(null)
    const [newDept, setNewDept] = useState("")
    const [newEmp, setNewEmp] = useState({})
    const router = useRouter();

    //sirf check krna hai ki token hai ya nhi
    useEffect(() => {
        //add security for token
    }, [])

    useEffect(async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let response = await axios.get(`${ip}/api/department/getDepartmentMembers`, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            if (response.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            if (response.data.success == 0) throw new Error("Server Error, No users found")
            // console.log(response.data.data[0].color + "dfvndfivnofinv ")
            // console.log("75", response.data.data)
            setDepartment(response.data.departmentMembers.name)
            setUsers(response.data.departmentMembers.users)
        } catch (err) {
            console.log("Error" + err)
        }
    }, [])

    const handleFilter = async (e) => {
        try {
            e.preventDefault()
            let token = localStorage.getItem("pepcoding_token");
            let url = `${ip}/api/users/searchEmployee`;
            let response = await axios.post(url,
                {
                    department: currentDepartment,
                    role: currentRole,
                    name: text
                }, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);

            let filteredArr = [];
            let responseArr = response.data.data;
            responseArr.forEach((departmentObj) => {
                departmentObj.Users.forEach(userObj => {
                    userObj.color = departmentObj.color;
                    userObj.dept = departmentObj.name;
                    filteredArr.push(userObj)
                })
            })

            setUsers(filteredArr);
        } catch (err) {
            console.log("Error" + err);
        }
    }

    const changePagesArr = () => {
        let pages = Math.ceil(users.length / 10)
        let temp = []
        for (let i = 1; i <= pages; i++) {
            temp.push(i);
        }
        setPageArr(temp);
        setCurrPage(1)
    }

    useEffect(() => {
        changePagesArr();
        setFilteredUsers(users)
        handlePageChange(1);
    }, [users])

    // useEffect(() => handlePageChange(1)
    // , [users])

    const handlePageChange = (page) => {
        // if (page != currPage) {
        setCurrPage(page)
        let temp = [];
        let si = (page - 1) * 10
        let ei = si + 10
        temp = users.slice(si, ei)
        setFilteredUsers([...temp])
    }

    const title = "Employee Details"
    return < div >
        <div className="container mx-auto">
            <div className="py-0.5">
                <div className="flex flex-row flex-wrap justify-center w-full py-1 mb-1 lg:justify-between sm:mb-0">
                    {/* <h2 className="w-11/12 text-2xl leading-tight md:pr-0">{title}</h2> */}

                    <div className="flex w-full gap-1 mb-2">
                    </div>
                    <div className="flex w-full gap-1 text-end">
                        <div className="w-1/3">
                            <input
                                type="text"
                                id='"form-subscribe-fFilter'
                                className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Name"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3">
                            <select id='"form-subscribe-Filter department-filter' onChange={(e) => {
                                setCurrentRole(e.target.value)
                            }}
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                <option value="">All Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Employee">Employee</option>
                                <option value="HDD">HDD</option>
                                <option value="salesperson">salesperson</option>
                                <option value="salesleader">salesleader</option>
                            </select>
                        </div>
                        <button
                            className="w-2/6 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                            onClick={handleFilter}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div className="py-4">
                    {
                        (filteredUsers.length === 0)
                            ? <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl">Oops!! No Data @ the moment..</h2>
                            :
                            <div className="max-w-full overflow-x-auto rounded-lg shadow">
                                <table className="w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Department
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredUsers.map((user) => (
                                                <tr>
                                                    <td className="px-5 py-1 text-sm bg-white border-b border-gray-20">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img
                                                                        alt="profil"
                                                                        src="/images/2.jpg"
                                                                        className="object-cover w-10 h-10 mx-auto rounded-full "
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {user.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.role}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-800`}>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`absolute inset-0 bg-yellow-200 rounded-full opacity-50`}
                                                            />
                                                            <span className="relative">{department}</span>
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-2.5 text-sm bg-white border-b border-gray-200 flex .items-center">
                                                        <button
                                                            onClick={() => {
                                                                setSUser(user);
                                                                setSelect("Edit")
                                                            }}
                                                            href="#"
                                                            className="p-1 px-2 text-indigo-600 bg-indigo-200 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                                    <div className="flex items-center">
                                        {
                                            pageArr.map((page) => (
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div >
};

export default Content;
