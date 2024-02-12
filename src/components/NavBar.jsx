import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import logo from '../images/logo.png';
import { FaRegUserCircle, FaFacebook ,FaPinterest  } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const NavBar = () => {

    const { user, signOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loadedUsers, setLoadedUsers] = useState([]);

    const loggedUser = loadedUsers.find(loadedUser => loadedUser?.userEmail === user?.email);

    // console.log(loggedUser);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setLoadedUsers(data))


    }, [])

    // console.log(loggedUser);

    const handleLogOut = () => {
        signOutUser()
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    text: 'LogOut Successfull!',
                })
                navigate('/')
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="bg-[#f6f6f6] text-secondary px-2 sm:px-6">
            <div className="max-w-7xl mx-auto px-0 flex justify-between items-center">
                <div className="flex gap-2">
                    <a className="text-xl" href="#"><FaFacebook></FaFacebook></a>
                    <a className="text-xl" href="#"><AiFillInstagram ></AiFillInstagram ></a>
                    <a className="text-xl" href="#"><FaPinterest  ></FaPinterest  ></a>
                </div>
                <div>
                    <Link to='/'>
                        <img className="w-44 object-contain" src={logo} alt="" />
                    </Link>
                </div>
                <div>
                    {
                        user ?
                            <div className="flex items-center gap-3">
                                <div>
                                    {
                                        loggedUser ?
                                            <PhotoProvider>
                                                <PhotoView src={loggedUser?.userPhoto}>
                                                    <img className="w-8 h-8 object-cover rounded-full cursor-pointer" src={loggedUser?.userPhoto} alt="" />
                                                </PhotoView>
                                            </PhotoProvider>
                                            :
                                            <div className="text-xl"><FaRegUserCircle></FaRegUserCircle></div>
                                    }
                                </div>
                                <Link onClick={handleLogOut} className="bg-primary text-black  px-2 sm:px-4 py-1 text-xs sm:text-lg rounded-md" to='/'>Log Out</Link>
                            </div>
                            :
                            <Link className="bg-primary text-white px-2 sm:px-4 py-1 rounded-md" to='/login'>Login</Link>
                    }
                </div>
            </div>
            <div className=" flex justify-center">
                <ul className="flex gap-4 sm:gap-8 text-xs sm:text-sm py-4 px-1">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-primary font-bold underline" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/addBlog"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-primary font-bold underline" : ""
                            }
                        >
                            Add Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allBlogs"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-primary font-bold underline" : ""
                            }
                        >
                            All Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/featuredBlogs"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-primary font-bold underline" : ""
                            }
                        >
                            Featured Blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/wishlist"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-primary font-bold underline" : ""
                            }
                        >
                            Wishlist
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;