import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import googleLogo from "../images/googleLogo.png";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import favicon from '../images/fav.png';
import AnimatedCursor from "react-animated-cursor";

const Login = () => {

    const [users, setUsers] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    const { signInUser, googleSignIn } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

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
                console.log(res.user);

                const loggedUser = res.user;

                const oldUser = users.find(user => user.userEmail === loggedUser.email);

                if (!oldUser) {
                    const newUser = { userEmail: loggedUser.email, userName: loggedUser.displayName, userPhoto: loggedUser.photoURL };
                    console.log(newUser);
                    fetch('https://bucket-bee-server.vercel.app/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                }

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
             <AnimatedCursor
                innerSize={15}
                outerSize={35}
                innerScale={1}
                outerScale={2}
                outerAlpha={0}
                hasBlendMode={true}
                innerStyle={{
                    backgroundColor: '#eab308'
                }}
                outerStyle={{
                    border: '3px solid #eab308'
                }}
            />
            <Helmet>
                <title>Login</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="py-10 px-5">
                <div className="max-w-xl mx-auto border-2 border-[#539aa0] p-10 rounded-md text-[#363636]">
                    <h2 className="text-center sm:text-3xl text-2xl font-bold py-9 border-b-2 text-[#363636] border-b-[#363636]">Login your account</h2>
                    <form className="mt-10 text-[#363636]" onSubmit={handleLogin}>
                        <input className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 rounded-md" type="email" name="email" required placeholder="Enter your email address" />
                        <input className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 my-4 rounded-md" type="password" name="password" required placeholder="Enter your password" />
                        <input type="submit" className="w-full bg-[#539aa0]  text-[#363636] font-bold py-2 rounded-md cursor-pointer" value="Login" />
                    </form>
                    <p className="text-center mt-6 sm:text-md text-sm">Dont’t Have An Account ? <Link className="font-bold text-blue-500" to='/register'>Register</Link></p>
                    <div className="mt-8">
                        <button onClick={handleGoogleSignIn}
                            className="w-full border-2 border-blue-600 duration-200 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-md py-1 flex justify-center items-center gap-1  text-white">
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