import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="space-y-6 text-center w-full h-[100vh] flex justify-center items-center">
            <div className="text-lg sm:text-lg">
                <h2 className="text-2xl sm:text-5xl text-yellow-500 font-bold">Oops!!!</h2>
                <p className="text-lg text-red-600 font-bold mt-3">Somwthing Went Wrong</p>
                <Link className="px-4 py-1 bg-yellow-500 rounded-md font-bold text-[#08133a] inline-block mt-3" to='/'>Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;