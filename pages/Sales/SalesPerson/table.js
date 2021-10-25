import React, { useState, useEffect } from 'react'
import axios from "axios";
import { salesTableAtom } from '../../../state/salesState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { ipAtom } from '../../../state/state';

function Table() {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const ip = useRecoilValue(ipAtom)
    const [salesTableData, setSalesTableData] = useRecoilState(salesTableAtom);
    const [oldSalesData, setOldSalesData] = useRecoilState(salesTableAtom);
    const [searchName, setSearchName] = useState("");
    const [salesObjRowIdx, setSalesRowIdx] = useState(-1);
    const [save, setSave] = useState({})

    const getSalesData = async () => {
        try {
            const url = `${ip}/api/sales`;
            const token = localStorage.getItem("pepcoding_token");

            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });

            console.log(response.data);
            if (response?.data?.sales) {
                setSalesTableData(response.data.sales);
                setOldSalesData(response.data.sales)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const postAllSalesData = () => {
        setSave({})
        salesTableData.forEach(async (salesObj) => {
            try {
                let { sales_id } = salesObj;
                const url = `${ip}/api/sales/${sales_id}`;
                const token = localStorage.getItem("pepcoding_token");

                let response = await axios.post(url, salesObj, {
                    headers: {
                        "Authorization": `Basic ${token}`
                    }
                })

                // getSalesData();
            } catch (err) {
                console.log(err);
            }

        })
    }

    const postSingleSalesData = async () => {
        try {
            delete save[salesObjRowIdx]
            // if (salesObjRowIdx === -1) return;
            let salesObj = salesTableData[salesObjRowIdx];
            let { sales_id } = salesObj;
            const url = `${ip}/api/sales/${sales_id}`;
            const token = localStorage.getItem("pepcoding_token");

            let response = await axios.post(url, salesObj, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            // getSalesData();
            console.log();
        } catch (err) {
            console.log(err);
        }
    }

    const searchByNameRequest = async (e) => {
        try {
            const url = `${ip}/api/sales/searchByNamePerson/`;
            const token = localStorage.getItem("pepcoding_token");

            let response = await axios.post(url, {
                search_name: searchName
            }, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            });

            console.log(response.data);
            if (response?.data?.sales) setSalesTableData(response.data.sales);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(save)
    }, [save])

    const manipulateSalesData = (e, salesRowIdx, key) => {
        console.log(salesRowIdx)
        setSave({ ...save, [salesRowIdx]: {} })
        let newSalesTableData = [...salesTableData];
        let newSalesObj = { ...newSalesTableData[salesRowIdx] };
        newSalesObj[key] = e.currentTarget.checked;
        // console.log(newSalesObj);
        newSalesTableData[salesRowIdx] = newSalesObj;
        setSalesTableData(newSalesTableData);
    }

    const handleRemarksData = (e, salesRowIdx, key) => {
        console.log(salesRowIdx)
        setSave({ ...save, [salesRowIdx]: {} })
        let newSalesTableData = [...salesTableData];
        let newSalesObj = { ...newSalesTableData[salesRowIdx] };
        newSalesObj[key] = e.currentTarget.value;
        // console.log(newSalesObj);
        newSalesTableData[salesRowIdx] = newSalesObj;
        setSalesTableData(newSalesTableData);
    }

    useEffect(() => {
        getSalesData();
    }, [])

    return (
        <div>
            <div className="max-w-full">
                {/* Header */}
                <div className="mt-4 mb-4 mr-4 text-end">
                    <div className="flex justify-end w-full space-x-3">
                        <div className="relative ">
                            {/* <input
                                    type="text"
                                    id='"form-subscribe-Filter'
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Department"
                                /> */}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id='"form-subscribe-Filter'
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Client Name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.currentTarget.value)}
                            />
                        </div>
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                            onClick={searchByNameRequest}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {/* Table */}
                {(salesTableData.length === 0)
                    ? <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl">Oops!! No Sales Data @ the moment..</h2>
                    :
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full leading-normal">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(salesTableData[0]).map((key, idx) => {
                                            return (
                                                <th
                                                    key={idx}
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    {key}
                                                </th>
                                            )
                                        })
                                    }
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    salesTableData.map((elems, salesRowIdx) => {
                                        return (
                                            <tr className="h-10" key={`sales-obj-${salesRowIdx}`}>
                                                {
                                                    Object.keys(elems).map((key, dataIdx) => {
                                                        return (
                                                            <td key={`data-obj-${dataIdx}`} className="px-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {
                                                                        (typeof elems[key] === "boolean")
                                                                            ? (
                                                                                <input
                                                                                    onChange={(e) => manipulateSalesData(e, salesRowIdx, key)}
                                                                                    type="checkbox" checked={elems[key]} className="form-checkbox" />
                                                                            )
                                                                            : (key === "remarks" ? <textarea onChange={(e) => handleRemarksData(e, salesRowIdx, key)} className="border rounded resize-none w-30" value={elems[key]}></textarea> : elems[key])
                                                                    }
                                                                </p>
                                                            </td>
                                                        )
                                                    })
                                                }
                                                <td className="px-5 text-sm bg-white border-b border-gray-200">
                                                    {
                                                        JSON.stringify.length > 2 && save[salesRowIdx] != null && <button
                                                            onClick={() => {
                                                                setSalesRowIdx(salesRowIdx)
                                                                setOpen(true)
                                                            }}
                                                            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">Save</button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <div className="mt-8 text-right md:col-span-5">
                <div className="inline-flex items-end">
                    {
                        JSON.stringify(save).length > 2 && <button
                            onClick={postAllSalesData}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Submit</button>
                    }
                </div>
            </div>

            {/* Submit MODAL */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Activity Confirmation
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to perform this activity? All of your activity will be permanently applied.
                                                    This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            postSingleSalesData()
                                            setOpen(false)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </div>
    )
}

export default Table
