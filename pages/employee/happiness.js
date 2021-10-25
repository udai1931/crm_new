import { useRecoilValue } from "recoil";
import { employeeDayAtom } from "../../state/employeeState";

const Happiness = () => {
    const employeeDay = useRecoilValue(employeeDayAtom);

    return (
        <div className="m-auto max-w-screen-lg">
            <div>
                <div className="px-4 bg-white rounded shadow-lg md pb-12">
                    <div className="pt-4 pb-8 items-center gap-4 gap-4 text-sm gap-y-2"></div>
                    <div className="lg:col-span-2 mt-4">
                        <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Happiness</h2>
                        {
                            (!employeeDay?.Happiness)
                                ? <div>No Happiness Today!!</div>
                                : <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-4">
                                    <div className="md:col-span-2">
                                        <label htmlFor="programming">Programming</label>
                                        <input type="number" min="0" max="5" readOnly name="programming" id="programming" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue={employeeDay.Happiness.programming} placeholder="" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="english">English</label>
                                        <input type="number" min="0" max="5" readOnly name="english" id="english" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue={employeeDay.Happiness.english} placeholder="" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="gym">Gym</label>
                                        <input type="number" min="0" max="5" readOnly name="gym" id="gym" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue={employeeDay.Happiness.gym} placeholder="" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="performance">Performance</label>
                                        <input type="number" min="0" max="5" readOnly name="performance" id="performance" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" defaultValue={employeeDay.Happiness.performance} placeholder="" />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Happiness;