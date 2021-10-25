import { useRecoilValue } from "recoil";
import { employeeDayAtom } from "../../state/employeeState";

const Health = () => {
    const employeeDay = useRecoilValue(employeeDayAtom);

    return (
        <div className="m-auto max-w-screen-lg">
            <div>
                <div className="px-4 bg-white rounded shadow-lg md">
                    <div className="pt-4 pb-8 items-center gap-4 gap-4 text-sm gap-y-2">
                        {
                            (!employeeDay?.Health)
                            ? <div>No Health Today!!</div>
                            : <div className="lg:col-span-2 mt-4">
                                <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Health</h2>
                                <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-4">
                                    <div className="md:col-span-4">
                                        <label htmlFor="programming">Morning Temp</label>
                                        <input type="number" name="morning_temperature" id="morning_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Health.morning_temperature} placeholder="" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label htmlFor="english">Evening Temperature</label>
                                        <input type="number" name="evening_temperature" id="evening_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Health.evening_temperature} placeholder="" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label htmlFor="english">Covid Symptoms</label>
                                        <input type="text" name="covid_symptoms" id="covid_symptoms" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Health.covid_symptoms} placeholder="" />
                                    </div>
                                    <div className="md:col-span-4">
                                        <label htmlFor="english">Mask Wearing Rating</label>
                                        <input type="number" name="mask_wearing_rating" id="evening_temperature" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Health.mask_wearing_rating} placeholder="" />
                                    </div>
                                    <div className="md:col-span-4"></div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Health;