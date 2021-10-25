import { useRecoilValue } from "recoil";
import { employeeDayAtom } from "../../state/employeeState";

const Rating = () => {
    const employeeDay = useRecoilValue(employeeDayAtom);

    return (
        <div className="m-auto max-w-screen-lg">
            <div>
                <div className="px-4 bg-white rounded shadow-lg md pb-12">
                    <div className="pt-4 pb-8 items-center gap-4 gap-4 text-sm gap-y-2"></div>
                    <div className="lg:col-span-2 mt-4">
                        <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Happiness</h2>
                        {
                            (!employeeDay?.Rating)
                                ? <div>No Ratings Today</div>
                                : <div className="lg:col-span-2 mt-4">
                                    <h2 className="mb-4 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate mb-6">Rating</h2>
                                    <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                                        <div className="md:col-span-2">
                                            <label htmlFor="programming">Rating of the Day</label>
                                            <input type="number" name="rating_of_the_day" id="rating_of the_day" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Rating.rating_of_the_day} placeholder="" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label htmlFor="english">Remarks</label>
                                            <input type="text" name="remark" id="remark" className="w-full h-10 px-4 mt-1 border rounded outline-none bg-gray-50" readOnly defaultValue={employeeDay.Rating.remark} placeholder="" />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rating;