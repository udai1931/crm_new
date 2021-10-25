import { atom } from "recoil";

// export const personalAtom = atom(
//     {
//         key: "personalTab",
//         default: {}
//     }
// )

export const selectedUser = atom(
    {
        key:"selectedUser",
        default:''
    }
)

export const day_id = atom(
    {
        key:"day_id",
        default:null
    }
)

export const day = atom(
    {
        key:"day",
        default:{}
    }
)

export const happiness = atom(
    {
        key:"happiness",
        default:{}
    }
)

export const breaks = atom(
    {
        key:"break",
        default:{}
    }
)

export const rating = atom(
    {
        key:"rating",
        default:{}
    }
)

export const health = atom(
    {
        key:"health",
        default:{}
    }
)