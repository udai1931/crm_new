import axios from 'axios'
import React, { useState } from 'react'

function Upload() {
    const [uploaded, setUploaded] = useState(false)
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault()
        console.log(file)
        setUploading(true)
        try {
            let token = localStorage.getItem("pepcoding_token");
            let url = "/api/upload";
            let formData = new FormData()
            // var blob = new Blob([file], { type: 'text/csv;charset=utf-8;' });
            // formData.append('file', blob)
            // console.log(formData)
            
            if(file.length>0){
                console.log("hi")
                file.forEach((f) => {
                    formData.append("media",f)
                });
            }
            let response = await axios.post(url,
                formData
                , {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                        'content-type': 'multipart/form-data'
                    }
                }
                );
            console.log(response.data);
            // setUsers(filteredArr);
        } catch (err) {
            console.log("Error" + err);
        }
    }
    return (
        <>
            <div class="flex justify-center mt-8">
                <div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                    {
                        !uploaded ?
                            <div class="m-4">
                                <label class="inline-block mb-2 text-gray-500">File Upload</label>
                                <div class="flex items-center justify-center w-full">
                                    <label
                                        class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div class="flex flex-col items-center justify-center pt-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                Please click to Attach a file</p>
                                        </div>
                                        <input type="file" class="opacity-0" onChange={(e) => {
                                            setFile(e.target.files)
                                            setUploaded(true)
                                        }} />
                                    </label>
                                </div>
                            </div> :
                            <>
                                {
                                    !uploading &&

                                    <div class="flex justify-center p-2 w-auto">
                                        <button class="w-full px-8 py-2 text-white bg-blue-500 rounded shadow-xl" onClick={handleClick}>Upload File</button>
                                        <button class="w-full px-8 py-2 text-white bg-red-500 rounded shadow-xl ml-2" onClick={() => setUploaded(false)}>Discard</button>
                                    </div>
                                }
                            </>
                    }
                </div>
            </div>
            <div>
                {
                    uploading &&
                    <>
                        <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
                            <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Upload
