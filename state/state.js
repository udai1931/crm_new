import { atom } from "recoil";

export const userAtom = atom(
    {
        key: "user",
        default: {}
    }
);

export const sideBarAtom = atom(
    {
        key: "sideBar",
        default: "Users"
    }
)

export const profileTabAtom = atom(
    {
        key: "profileTab",
        default: "Attendance"
    }
)


export const ipAtom = atom(
    {
        key: "ip",
        default: "http://165.232.182.78:8080"
        // default: "http://192.168.1.160:8080"
    }
)