import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil';

import { ipAtom, userAtom } from '../state/state';

export default function Home() {
    const [user, setUser] = useRecoilState(userAtom)
    const ip = useRecoilValue(ipAtom)
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

                let response = await axios.post(`${ip}/api/users/getUsersFromToken`, {
                    token: localStorage.getItem('pepcoding_token')
                }, {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('pepcoding_token')
                })
                if (response.data.success == 0) throw new Error();
                console.log(response);
                setUser(response.data.data)
                handleUserRoute(response.data.data)
            }
        } catch (err) {
            console.log(err)
            router.push('/Login')
        }
    }, [])

    return (
        <div>
            Welcome to CRM
        </div>
    )
}
