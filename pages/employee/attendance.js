import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useRecoilState } from 'recoil';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { salesTableAtom } from '../../state/salesState';

function Attendance() {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <div>
            <div className="max-w-full">
                {/* Header */}
                <div className="text-end mb-4 mt-4 mr-4">
                    <div className="flex justify-end w-full space-x-3">
                        <div className="relative">
                            <input type="date" className="h-full px-2 rounded" value={Date.now().toString()}/>
                        </div>
                        <div className="relative">
                            <input type="date" className="h-full px-2 rounded" value={Date.now().toString()}/>
                        </div>
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {/* Table */}
                {
                    // (salesTableData.length === 0)
                    // ? <h2 className="text-center text-2xl font-bold leading-7 mb-4 text-gray-900 sm:text-3xl">Oops!! No Sales Data @ the moment..</h2>
                    // :
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="font-bold px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-bold px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        FIRST HALF
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-bold px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        SECOND HALF
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-bold px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        IN TIME
                                    </th>
                                    <th
                                        scope="col"
                                        className="font-bold px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        OUT TIME
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // salesTableData.map((elems, salesRowIdx) => {
                                    //     return (
                                    //         <tr className="h-10" key={`sales-obj-${salesRowIdx}`}>
                                    //             {
                                    //                 Object.keys(elems).map((key, dataIdx) => {
                                    //                     return (
                                    //                         <td key={`data-obj-${dataIdx}`} className="px-5 text-sm bg-white border-b border-gray-200">
                                    //                             <p className="text-gray-900 whitespace-no-wrap">
                                    //                                 {
                                    //                                     (typeof elems[key] === "boolean")
                                    //                                         ? (
                                    //                                             <input
                                    //                                                 onChange={(e) => manipulateSalesData(e, salesRowIdx, key)}
                                    //                                                 type="checkbox" checked={elems[key]} className="form-checkbox" />
                                    //                                         )
                                    //                                         : (key === "remarks" ? <textarea onChange={(e) => handleRemarksData(e, salesRowIdx, key)} className="resize-none border rounded w-30" value={elems[key]}></textarea> : elems[key])
                                    //                                 }
                                    //                             </p>
                                    //                         </td>
                                    //                     )
                                    //                 })
                                    //             }
                                    //             <td className="px-5 text-sm bg-white border-b border-gray-200">
                                    //                 {
                                    //                     JSON.stringify.length > 2 && save[salesRowIdx] != null && <button
                                    //                         onClick={() => {
                                    //                             setSalesRowIdx(salesRowIdx)
                                    //                             setOpen(true)
                                    //                         }}
                                    //                         className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">Save</button>
                                    //                 }
                                    //             </td>
                                    //         </tr>
                                    //     )
                                    // })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            {/* <div className="mt-8 text-right md:col-span-5">
                <div className="inline-flex items-end">
                    {
                        JSON.stringify(save).length > 2 && <button
                            onClick={postAllSalesData}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Submit</button>
                    }
                </div>
            </div> */}

            {/* Submit MODAL */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
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
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            postSingleSalesData()
                                            setOpen(false)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Attendance
