import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import favicon from '../images/fav.png';
import AnimatedCursor from "react-animated-cursor";

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { createUser, userName, userPhoto, setUserName, setUserPhoto } = useContext(AuthContext);

    // set username
    const handleUserName = e => {
        const name = e.target.value;
        setUserName(name)
    }

    // set user photo
    const handleUserPhoto = e => {
        const photo = e.target.value;
        setUserPhoto(photo)
    }

    // registration
    const handleRegister = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                text: 'Password Must Have One Uppercase!',
            })
            return
        }
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        if (!specialCharacterRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                text: 'Password Must Have One Special Character!',
            })
            return
        }
        const numericRegex = /\d/;
        if (!numericRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                text: 'Password Must Have At Least One Numeric Digit!',
            });
            return;
        }
        if (password.length <= 6) {
            Swal.fire({
                icon: 'error',
                text: 'Password Must Be 6 Character Longer',
            })
            return
        }

        createUser(email, password)
            .then(res => {
                console.log(res.user);

                const user = { userEmail: email, userName, userPhoto };
                // console.log(user);
                fetch('https://bucket-bee-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(res => console.log(res))
                .catch(err => console.error(err))

                Swal.fire({
                    icon: 'success',
                    text: 'User Created Successfully!',
                })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Registration Credentials!',
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
                <title>Register</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="py-10 px-5">
                <div className=" max-w-xl mx-auto bg-white border-2 border-[#539aa0]  p-10 rounded-md text-[#363636]">
                    <h2 className="text-center sm:text-3xl text-2xl font-bold py-9 border-b-2 text-[#363636] border-b-[#363636]">Register your account</h2>
                    <form className="mt-10 text-[#363636]" onSubmit={handleRegister}>
                        <input onChange={handleUserName} className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 rounded-md" type="text" name="name" required placeholder="Enter your name" />
                        <input onChange={handleUserPhoto} className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 rounded-md my-4" type="text" name="photo" required placeholder="Enter your photo URL" />
                        <input className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 rounded-md" type="email" name="email" required placeholder="Enter your email address" />
                        <input className="w-full border-2 outline-none bg-white border-[#539aa0] p-2 my-4 rounded-md" type="password" name="password" required placeholder="Enter your password" />
                        <input type="submit" className="w-full bg-[#539aa0] text-[#363636] font-bold py-2 rounded-md cursor-pointer" value="Register" />
                    </form>
                    <p className="text-center mt-6 sm:text-md text-sm">Already Have An Account ? <Link className="font-bold text-blue-500" to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;