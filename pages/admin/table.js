import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from "recoil";
import { sideBarAtom, ipAtom } from "../../state/state";
import { selectedUser } from "../../state/profileState";

const Content = () => {
    const ip = useRecoilValue(ipAtom)
    const [select, setSelect] = useRecoilState(sideBarAtom)
    const [sUser, setSUser] = useRecoilState(selectedUser);
    const [departments, setDepartments] = useState([])
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

    const getDepartments = async () => {
        try {
            let token = localStorage.getItem("pepcoding_token");
            let response = await axios.get(`${ip}/api/department`, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success == 2) {
                // throw new Error("Server Error, No departments found")
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }

            if (response.data.success == 0) throw new Error("Server Error, No departments found")
            console.log(response.data.data)
            setDepartments(response.data.data)
        } catch (err) {
            console.log("Error" + err)
        }
    }

    useEffect(async () => {
        getDepartments()
    }, [])

    useEffect(async () => {
        let token = localStorage.getItem("pepcoding_token");
        try {
            let response = await axios.get(`${ip}/api/users/getAll`, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            if (response.data.success == 0) throw new Error("Server Error, No users found")
            console.log(response.data.data[0].color + "dfvndfivnofinv ")
            console.log("75", response.data.data)
            setUsers(response.data.data)
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

    const handleSearch = async (e) => {
        ////add dept to body for better vserach
        try {
            e.preventDefault();
            let token = localStorage.getItem("pepcoding_token")
            let response = await axios.post(`${ip}/api/users/searchEmployee`,
                { name: text },
                {
                    'headers': {
                        'Authorization': `Bearer ${token}`
                    }
                });

            // let data = await axios({
            //     method: "post",
            //     url: "${ip}/api/users/searchEmployee",
            //     data: { name: text },
            // })
            console.log(response.data);
            setUsers(response.data.data);
            // changePagesArr();
        } catch (err) {
            console.log(err);
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
        // }
    }

    const handleAddDept = async () => {
        setShowModal("");
        let token = localStorage.getItem("pepcoding_token")
        let data = await axios.post(`${ip}/api/department/create`, { name: newDept }, { 'headers': { 'Authorization': `Bearer ${token}` } });
        console.log(data.data)
        // setDepartments([...departments, { id: data.data.department.department_id, name: data.data.department.name }])
        setNewDept("")
        getDepartments()
    }

    const handleAddEmp = async () => {
        setShowModal("");
        let token = localStorage.getItem("pepcoding_token")
        let data = await axios.post(`${ip}/api/users/signup`, newEmp, { 'headers': { 'Authorization': `Bearer ${token}` } });
        console.log(data.data)
        // setDepartments([...departments,{id:data.data.department.department_id,name:data.data.department.name}])
        setNewEmp({})
        try {
            let data = await axios.get(`${ip}/api/users/getAll`, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (data.data.success == 2) {
                localStorage.setItem("pepcoding_token", null);
                router.push('/Login')
            }
            if (data.data.success == 0) throw new Error("Server Error, No users found")
            // console.log(data.data.data + "dfvndfivnofinv ")
            setUsers(data.data.data)
        } catch (err) {
            console.log("Error" + err)
        }
    }

    const updateObject = (e) => {
        setNewEmp({ ...newEmp, [e.target.name]: e.target.value })
        console.log(newEmp)
    }

    const handleDelete = async (obj) => {
        setDelModal(null)
        console.log(obj)
        let token = localStorage.getItem("pepcoding_token")
        let data = await axios.post(`${ip}/api/users/deleteUser`, { id: obj.user_id }, { 'headers': { 'Authorization': `Bearer ${token}` } });
        console.log(data.data)
        setUsers(data.data.data)
    }

    const title = "Employee Details"
    return < div className="w-full">
        <div className="container mx-auto">
            <div className="py-0.5">
                <div className="flex flex-row flex-wrap justify-center w-full py-1 mb-1 lg:justify-between sm:mb-0">
                    {/* <h2 className="w-11/12 text-2xl leading-tight md:pr-0">{title}</h2> */}
                    <div className="flex justify-center w-full">
                        <button
                            className="w-full px-4 py-2 mb-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 lg:w-2/5"
                            type="submit"
                            onClick={() => setShowModal("1")}
                        >
                            Add Employee
                        </button>
                        {
                            showModal == "1" &&
                            <>
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto w-full max-w-3xl mx-auto my-6 top-3 lg:top-0">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                                <h3 className="text-3xl font-semibold">
                                                    Add Employee
                                                </h3>
                                                <button
                                                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="block w-6 h-6 text-2xl text-black text-red-600 bg-transparent outline-none opacity-5 focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div class="mt-5 md:mt-0 md:col-span-2">
                                                <form action="#" method="POST">
                                                    <div class="shadow overflow-hidden sm:rounded-md">
                                                        <div class="px-4 py-5 bg-white sm:p-6">
                                                            <div class="grid grid-cols-6 gap-6">
                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="first_name" class="block text-sm font-medium text-gray-700">Email</label>
                                                                    <input type="email" name="email" id="email" autocomplete="email" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>

                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="last_name" class="block text-sm font-medium text-gray-700">Name</label>
                                                                    <input type="text" name="name" id="name" autocomplete="name" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>

                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="email_address" class="block text-sm font-medium text-gray-700">Password</label>
                                                                    <input type="password" name="password" id="password" autocomplete="password" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>
                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="email_address" class="block text-sm font-medium text-gray-700">Address</label>
                                                                    <input type="text" name="address" id="address" autocomplete="address" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>
                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="email_address" class="block text-sm font-medium text-gray-700">Salary</label>
                                                                    <input type="number" name="salary" id="salary" autocomplete="salary" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>
                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="country" class="block text-sm font-medium text-gray-700">Role</label>
                                                                    <select id="country" name="role" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200" onChange={(e) => updateObject(e)}>
                                                                        <option>Select Roles</option>
                                                                        <option>Admin</option>
                                                                        <option>Team Lead</option>
                                                                        <option>Employee</option>
                                                                        <option>HDD</option>
                                                                        <option>salesperson</option>
                                                                        <option>salesleader</option>
                                                                    </select>
                                                                </div>

                                                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                    <label for="city" class="block text-sm font-medium text-gray-700">Vaccine Dose 1</label>
                                                                    <input type="date" name="dose_1" id="date-1" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>

                                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label for="state" class="block text-sm font-medium text-gray-700">Vaccine Dose 1</label>
                                                                    <input type="date" name="dose_2" id="date_2" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" onChange={(e) => updateObject(e)} />
                                                                </div>

                                                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label for="postal_code" class="block text-sm font-medium text-gray-700">Department</label>
                                                                    <select id="department" name="department_id" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200" onChange={(e) => {
                                                                        console.log(departments)
                                                                        updateObject(e)
                                                                    }}>
                                                                        <option>Select Department</option>
                                                                        {
                                                                            departments?.map((dep) => (
                                                                                <option value={dep.department_id}  >{dep.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                                <button
                                                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                    style={{ border: "3px solid red", borderRadius: '10px' }}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                                    type="button"
                                                    onClick={() => handleAddEmp()}
                                                    style={{ background: "green", borderRadius: '10px' }}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                            </>
                        }
                        <button
                            className="w-full px-4 py-2 mb-2 ml-5 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 lg:w-2/5"
                            type="submit"
                            onClick={() => setShowModal("2")}
                        >
                            Add Department
                        </button>
                        {
                            showModal == "2" &&
                            <>
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                                <h3 className="text-3xl font-semibold">
                                                    Add Department
                                                </h3>
                                                <button
                                                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                                    onClick={() => setShowModal("")}
                                                >
                                                    <span className="block w-6 h-6 text-2xl text-black text-red-600 bg-transparent outline-none opacity-5 focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div class="mt-5 md:mt-0 md:col-span-2">
                                                <form action="#" method="POST">
                                                    <div class="shadow overflow-hidden sm:rounded-md">
                                                        <div class="px-4 py-5 bg-white sm:p-6">
                                                            <div class="grid grid-cols-6 gap-6">
                                                                <div class="col-span-6 sm:col-span-3">
                                                                    <label for="first_name" class="block text-sm font-medium text-gray-700">Department Name</label>
                                                                    <input type="text" name="first_name" id="first_name" class="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" value={newDept} onChange={(e) => setNewDept(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                                <button
                                                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                                    type="button"
                                                    onClick={() => setShowModal("")}
                                                    style={{ border: "3px solid red", borderRadius: '10px' }}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                                    type="button"
                                                    onClick={() => handleAddDept()}
                                                    style={{ background: "green", borderRadius: '10px' }}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                            </>
                        }
                    </div>
                    <div className="flex w-full gap-1 mb-2">

                        <input
                            type="text"
                            id='"form-subscribe-fFilter'
                            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Name"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {/* <button
                            className="w-2/6 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                            onClick={(e) => handleSearch(e)}
                        >
                            Search
                        </button> */}
                    </div>
                    <div className="flex w-full gap-1 text-end">
                        <div className="w-1/3">
                            <select id='"form-subscribe-Filter department-filter' onChange={(e) => {
                                setCurrentDepartment(e.target.value)
                                console.log(currentDepartment)
                            }}
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                <option value="0" >Department</option>
                                {
                                    departments?.map((dep) => (
                                        <option value={dep.department_id}>{dep.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-1/3">
                            <select id='"form-subscribe-Filter department-filter' onChange={(e) => {
                                setCurrentRole(e.target.value)
                            }}
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                <option value="">Select Roles</option>
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
                            <div className="max-w-full overflow-x-auto rounded-lg shadow" style={{ height: "70vh" }} >
                                <table className="w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                            >
                                                Department
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
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
                                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight text-${user.color}-800`}>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`absolute inset-0 bg-${user.color}-200 rounded-full opacity-50`}
                                                            />
                                                            <span className="relative">{user.dept}</span>
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
                                                        &nbsp;&nbsp;&nbsp;
                                                        <button
                                                            href="#"
                                                            className="p-1 px-2 text-red-600 bg-red-200 hover:text-red-900"
                                                            onClick={() => setDelModal(user)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {
                                    delModal != null &&
                                    <>
                                        <div
                                            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                                        >
                                            <div className="relative w-auto max-w-3xl mx-auto my-6">
                                                {/*content*/}
                                                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                                        <h3 className="text-3xl font-semibold">
                                                            Delete User
                                                        </h3>
                                                        <button
                                                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                                                ×
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative flex-auto p-6">
                                                        <p className="my-4 text-lg leading-relaxed text-blueGray-500">
                                                            Are you sure want to delete {delModal.name}
                                                        </p>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                                        {/* <button
                                                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear bg-red-500 outline-none text-white-500 background-transparent focus:outline-none"
                                                    type="button"
                                                    onClick={() => handleDelete(delModal)}
                                                >
                                                    Delete
                                                </button> */}
                                                        <button
                                                            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                                            type="button"
                                                            onClick={() => handleDelete(delModal)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-500 rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                                            type="button"
                                                            onClick={() => setDelModal(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                    </>
                                }
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
