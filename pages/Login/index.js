import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from 'react'
import { ipAtom, userAtom } from '../../state/state';
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useRecoilState(userAtom);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const ip = useRecoilValue(ipAtom)
    console.log(ip);
    const handleUserRoute = (data) => {
        if (data.role === "Admin") router.push("/admin");
        else if (data.role === "salesperson") router.push("/Sales/SalesPerson");
        else if (data.role === "salesleader") router.push("/Sales/SalesLeader");
        else if (data.role === "HDD") router.push("/HDD");
    }

    useEffect(async () => {
        try {
            console.log("a")
            if (localStorage.getItem('pepcoding_token') == null) throw new Error();

            console.log("b")
            if (localStorage.getItem('pepcoding_token')) {

                let response = await axios.post(ip + "/api/users/getUsersFromToken", {
                    token: localStorage.getItem('pepcoding_token')
                }, {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('pepcoding_token')
                })

                if (response.data.success == 0) throw new Error();
                console.log(response);
                handleUserRoute(response.data.data)
                setUser(response.data.data)
            }
        } catch (err) {
            console.log(err)
            router.push('/Login')
        }
    }, [])
    let handleClick = async (e) => {
        e.preventDefault()
        try {
            let response = await axios({
                method: "post",
                url: `${ip}/api/users/login`,
                data: { email, password },
            })
            console.log(response);
            if (response.data.success == 0) throw new Error("Incorrect Email/Password");
            setEmail('')
            setPassword('')
            localStorage.setItem("pepcoding_token", response.data.token)
            setUser(response.data.data)
            handleUserRoute(response.data.data);
            console.log(user);
        } catch (error) {
            console.log(error)
            setEmail('')
            setPassword('')
            setError(error.message)
            setTimeout(() => {
                setError('')
            }, 4000)
        }
    }
    return (
        <>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage: `url(images/img/register_bg_2.png)`,
                            backgroundRepeat: "no-repeat"
                        }}
                    ></div>
                    <div className="container h-full px-4 mx-auto">
                        <div className="flex items-center content-center justify-center h-full">
                            <div className="w-full px-4 lg:w-4/12">
                                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-300 border-0 rounded-lg shadow-lg">
                                    <div className="px-6 py-6 mb-0 rounded-t">
                                        <div className="mb-3 text-center">
                                            <h6 className="text-sm font-bold text-gray-600">
                                                Sign in with
                                            </h6>
                                        </div>
                                        <div className="text-center btn-wrapper">
                                            <button
                                                className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs font-bold text-gray-800 uppercase bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src="images/img/google.svg"
                                                />
                                                Github
                                            </button>
                                            <button
                                                className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-bold text-gray-800 uppercase bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src="/images/img/github.svg"
                                                />
                                                Google
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-gray-400 border-b-1" />
                                    </div>
                                    <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                                        <div className="mb-3 font-bold text-center text-gray-500">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    {/* <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="w-5 h-5 ml-1 text-gray-800 border-0 rounded form-checkbox"
                                                        style={{ transition: "all .15s ease" }}
                                                    /> */}
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        {
                                                            error
                                                        }
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="mt-6 text-center">
                                                <button
                                                    className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none active:bg-gray-700 hover:shadow-lg focus:outline-none"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    onClick={handleClick}
                                                    disabled={loading}
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6">
                                    <div className="w-1/2">
                                        <a
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            className="text-gray-300"
                                        >
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <a
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            className="text-gray-300"
                                        >
                                            <small>Create new account</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}