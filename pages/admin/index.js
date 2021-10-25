import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import DashboardLayout from '../../src/dashboard/layout'
import { ipAtom, sideBarAtom, userAtom } from '../../state/state'
import Content from './table'
import Performance from './performance'
import Profile from './profile'
import Sales from './sales'
import Attendance from './attendance'
import router from 'next/router'
import axios from 'axios'
import Upload from './Upload'

export default function index() {
    const ip = useRecoilValue(ipAtom)
    const [user, setUser] = useRecoilState(userAtom)
    useEffect(async () => {
        try {
            if (localStorage.getItem('pepcoding_token') == null) throw new Error();
            if (localStorage.getItem('pepcoding_token')) {
                let response = await axios.post(`${ip}/api/users/getUsersFromToken`, {
                    token: localStorage.getItem('pepcoding_token')
                }, {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('pepcoding_token')
                })
                console.log(response)
                if (response.data.success == 0) throw new Error();
                router.push('/admin')
                setUser(response.data.data)
            }
        } catch (err) {
            console.log(err)
            router.push('/Login')
        }
    }, [])


    const [select, setSelect] = useRecoilState(sideBarAtom)
    let showCommponent = (select) => {
        if (select == "Users") {
            return <Content />
        } else if (select == "Performance") {
            return <Performance />
        } else if (select == "Sales") {
            return <Sales />
        } else if (select == "Marketing") {
            return (<h1>Marketing</h1>)
        } else if (select == "Attendance") {
            return <Attendance />
        } else if (select == "Edit") {
            return (<Profile />)
        } else if (select == "Upload") {
            return (<Upload />)
        }
    }
    console.log("render", select)
    return (
        <DashboardLayout>
            <div>
                {
                    showCommponent(select)
                }
            </div>
        </DashboardLayout>
    )
}
