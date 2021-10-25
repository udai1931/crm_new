import { useRecoilValue } from "recoil";
import { employeeDayAtom } from "../../state/employeeState";

const Breaks = () => {
    const employeeDay = useRecoilValue(employeeDayAtom);

    return (
        <div className="m-auto max-w-screen-lg">
            <div>
                <div className="px-4 bg-white rounded shadow-lg md">
                    <div className="pt-4 pb-8 items-center gap-4 gap-4 text-sm gap-y-2">
                        {
                            <div className="mt-4">
                                <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Breaks</h2>
                                <div className="mb-4">
                                    <div className="flex justify-around">
                                        <div className="mb-4 text-xl font-bold leading-7 text-gray-900">Start Time</div>
                                        <div className="mb-4 text-xl font-bold leading-7 text-gray-900">End Time</div>
                                    </div>
                                    {
                                        (employeeDay?.Breaks?.length === 0)
                                            ? <div>No Breaks Today 😃</div>
                                            : <div className="flex h-56 overflow-auto">
                                                <div className="w-3/6 text-center">
                                                    {
                                                        employeeDay?.Breaks?.map((breaks) => (
                                                            <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.in_time}</p></div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="w-3/6 text-center">
                                                    {
                                                        employeeDay?.Breaks.map((breaks) => (
                                                            <div><p className="inline-block p-1 mb-2 text-base bg-yellow-300 rounded-md">{breaks.out_time}</p></div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breaks;