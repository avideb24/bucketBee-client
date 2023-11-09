import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import logo from '../images/logo.png';


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
        <div className="bg-white text-[#6e98a9] px-2 sm:px-6">
            <div className="navbar max-w-7xl mx-auto px-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#08133a] text-white rounded-box w-52">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/addBlog"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                    }
                                >
                                    Add Blog
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/allBlogs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                    }
                                >
                                    All Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/featuredBlogs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                    }
                                >
                                    Featured Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/wishlist"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-yellow-500 font-bold underline" : ""
                                    }
                                >
                                    Wishlist
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to='/'>
                        <img className="w-44 object-contain" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#539aa0] font-bold underline" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/addBlog"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#539aa0] font-bold underline" : ""
                                }
                            >
                                Add Blog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/allBlogs"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#539aa0] font-bold underline" : ""
                                }
                            >
                                All Blogs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/featuredBlogs"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#539aa0] font-bold underline" : ""
                                }
                            >
                                Featured Blogs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/wishlist"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#539aa0] font-bold underline" : ""
                                }
                            >
                                Wishlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
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
                                        ''
                                    }
                                </div>
                                <Link onClick={handleLogOut} className="bg-[#539aa0] text-black  px-2 sm:px-4 py-1 text-xs sm:text-lg rounded-md" to='/'>Log Out</Link>
                            </div>
                            :
                            <Link className="bg-[#539aa0] text-black px-2 sm:px-4 py-1 rounded-md" to='/login'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;