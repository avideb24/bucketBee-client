import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import googleLogo from "../images/googleLogo.png";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const { signInUser, googleSignIn } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfull!',
                })
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Login Credentials!',
                })
                console.error(err)
            })
    }


    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully!',
                })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Login Credentials!',
                })
                console.error(error)
            })
    }


    return (
        <div>
            <NavBar></NavBar>
            <div className="py-10 px-5">
                <div className="max-w-xl mx-auto bg-[#132151] p-10 rounded-md text-white">
                    <h2 className="text-center sm:text-3xl text-2xl font-bold py-9 border-b-2 text-yellow-500 border-b-yellow-500">Login your account</h2>
                    <form className="mt-10 text-blue-950" onSubmit={handleLogin}>
                        <input className="w-full border-2 bg-white border-white p-2 rounded-md" type="email" name="email" required placeholder="Enter your email address" />
                        <input className="w-full border-2 bg-white border-white p-2 my-4 rounded-md" type="password" name="password" required placeholder="Enter your password" />
                        <input type="submit" className="w-full bg-yellow-500 text-[#08133a] font-bold py-2 rounded-md cursor-pointer" value="Login" />npm run dev
                    </form>
                    <p className="text-center mt-6 sm:text-md text-sm">Dont’t Have An Account ? <Link className="font-bold text-blue-500" to='/register'>Register</Link></p>
                    <div className="mt-8">
                        <button onClick={handleGoogleSignIn}
                            className="w-full bg-blue-600 rounded-md py-1 flex justify-center items-center gap-1  text-white">
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