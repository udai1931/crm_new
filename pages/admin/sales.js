import React, { useState, useEffect } from 'react'
import axios from "axios";
import { salesTableAtom } from '../../state/salesState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ipAtom } from '../../state/state';

function Sales() {
    const ip = useRecoilValue(ipAtom)
    const [salesTableData, setSalesTableData] = useRecoilState(salesTableAtom);
    const [salesLeaders, setSalesLeaders] = useState([]);
    const [selectedSalesLeaderID, setSelectedSalesLeaderID] = useState("");
    const [searchName, setSearchName] = useState("");
    const [startID, setStartID] = useState(0);
    const [endID, setEndID] = useState(0);

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
            if (response?.data?.sales) setSalesTableData(response.data.sales);
        } catch (err) {
            console.log(err);
        }
    }

    // const postSalesData = () => {
    //     salesTableData.forEach(async (salesObj) => {
    //         try {
    //             let { sales_id } = salesObj;
    //             const url = `${ip}/api/sales/${sales_id}`;
    //             const token = localStorage.getItem("pepcoding_token");

    //             let response = await axios.post(url, salesObj, {
    //                 headers: {
    //                     "Authorization": `Basic ${token}`
    //                 }
    //             })

    //             await getSalesData();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     })
    // }

    const searchByNameRequest = async (e) => {
        try {
            if (!searchName) return;

            const url = `${ip}/api/sales/searchByName/`;
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

    const manipulateSalesData = (e, salesRowIdx, key) => {
        let newSalesTableData = [...salesTableData];
        let newSalesObj = { ...newSalesTableData[salesRowIdx] };
        console.log(e.currentTarget.checked);
        newSalesObj[key] = e.currentTarget.checked;
        newSalesTableData[salesRowIdx] = newSalesObj;
        setSalesTableData(newSalesTableData);
    }

    const postAssignSalesLeader = async () => {
        try {
            let url = `${ip}/api/sales/assignSalesLeader`;
            const token = localStorage.getItem("pepcoding_token");
            let response = await axios.post(url, {
                start: startID,
                end: endID,
                leader_id: selectedSalesLeaderID
            }, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })

            console.log(response.data, "Pritnt");
        } catch (err) {
            console.log(err);
        }
    }

    const handleFilter = async (e) => {
        try {
            let filter = e.currentTarget.checked;
            console.log(filter);
            const url = `${ip}/api/sales/filter`;
            const token = localStorage.getItem("pepcoding_token");

            let response = await axios.post(url, {
                filter
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

    const getSalesLeaders = async () => {
        try {
            let url = `${ip}/api/sales/getSalesLeaders`;
            const token = localStorage.getItem("pepcoding_token");
            let response = await axios.get(url, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })

            console.log(response.data);
            if (response?.data?.salesLeaders) setSalesLeaders(response.data.salesLeaders);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getSalesData();
        getSalesLeaders();
    }, [])

    return (
        <div>
            <div className="max-w-full">
                {/* Header */}
                <div className="mt-4 mb-4 ml-2 mr-4 text-end">
                    <div className="flex flex-col lg:flex-row md:flex-row sm:">
                        <div className="flex justify-between w-full mb-2 mr-2 space-x-3">
                            <div className="flex-grow">
                                <input
                                    // value={startID}
                                    onChange={(e) => setStartID(Number(e.target.value))}
                                    placeholder="Start" type="number" min="0" name="assign_start" id="assign_start" className="w-full h-full px-4 py-2 border rounded outline-none bg-gray-50" />
                            </div>
                            <div className="flex-grow">
                                <input
                                    // value={endID}
                                    onChange={(e) => setEndID(Number(e.target.value))}
                                    placeholder="End" type="number" min="0" name="assign_end" id="assign_end" className="w-full h-full px-4 py-2 border rounded outline-none bg-gray-50" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-around w-full mb-2 space-x-3">
                            <div className="relative flex-grow">
                                <select
                                    onChange={(e) => setSelectedSalesLeaderID(e.target.value)}
                                    id='form-subscribe-Filter department-filter'
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                    <option value="null">Select Leader</option>
                                    {
                                        salesLeaders.map((leaderObj, idx) => {
                                            return <option key={idx} value={leaderObj.user_id}>{leaderObj.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <button
                                onClick={postAssignSalesLeader}
                                className="flex-grow px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                            >
                                Assign
                            </button>
                            <div className="flex-grow bg-white border border-transparent border-gray-300 rounded md:col-span-5">
                                <div className="flex items-center h-full pl-2 pr-2">
                                    <input
                                        onChange={handleFilter}
                                        type="checkbox" name="assigned" defaultChecked={true} id="assigned" className="inline-block form-checkbox" />
                                    <label htmlFor="first_half" className="inline-block ml-2">Assigned</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full space-x-3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="form-subscribe-Filter"
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Client Name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.currentTarget.value)}
                            />
                        </div>
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
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
                                                                            : (key === "remarks" ? <textarea className="border rounded resize-none" value={elems[key]}></textarea> : elems[key])
                                                                    }
                                                                </p>
                                                            </td>
                                                        )
                                                    })
                                                }

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {/* <div className="mt-8 text-right md:col-span-5">
                <div className="inline-flex items-end">
                    <button
                        onClick={postSalesData}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Submit</button>
                </div>
            </div> */}
        </div>
    )
}

export default Sales