import { atom } from "recoil";

export const salesTableAtom = atom(
    {
        key: "sales_table_data",
        default: []
    }
)