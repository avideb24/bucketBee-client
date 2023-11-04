import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import googleLogo from "../images/googleLogo.png";

const Login = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="py-10 px-5">
                <div className="max-w-xl mx-auto bg-[#132151] p-10 rounded-md text-white">
                    <h2 className="text-center sm:text-3xl text-2xl font-bold py-9 border-b-2 text-yellow-500 border-b-yellow-500">Login your account</h2>
                    <form className="mt-10 text-blue-950">
                        <input className="w-full border-2 bg-white border-white p-2 rounded-md" type="email" name="email" required placeholder="Enter your email address" />
                        <input className="w-full border-2 bg-white border-white p-2 my-4 rounded-md" type="password" name="password" required placeholder="Enter your password" />
                        <input type="submit" className="w-full bg-yellow-500 text-[#08133a] font-bold py-2 rounded-md cursor-pointer" value="Login" />npm run dev
                    </form>
                    <p className="text-center mt-6 sm:text-md text-sm">Dont’t Have An Account ? <Link className="font-bold text-blue-500" to='/register'>Register</Link></p>
                    <div className="mt-8">
                        <button
                            
                            className="w-full bg-blue-600 rounded-md py-1 flex justify-center items-center gap-1  text-white"
                        >
                            <img className="w-8" src={googleLogo} alt="" />
                            Login With Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;