import { atom } from "recoil";

export const employeeSideBarAtom = atom({
    key: "employee_sidebar",
    default: "Attendance"
})

export const employeeDayAtom = atom({
    key: "employee_day_data",
    default: null
})

export const employeeAllDayAtom = atom({
    key: "employee_all_data",
    default: null
})