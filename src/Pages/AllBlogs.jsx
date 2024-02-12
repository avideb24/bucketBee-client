import { Link, useNavigate } from "react-router-dom";
import { BsFillClipboardHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import favicon from '../images/favicon.png';
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const AllBlogs = () => {

    const { isPending, data: blogs, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://bucket-bee-server.vercel.app/blogs');
            return res.json();
        }
    });

    useEffect(() => {
        if (blogs) {
            setFilteredBlogs(blogs);
        }
    }, [blogs]);

    console.log(blogs);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [userWishlist, setUserWishlist] = useState([]);

    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        fetch(`https://bucket-bee-server.vercel.app/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserWishlist(data))
    }, [user?.email])

    const handleWishlist = id => {
        if (user) {
            const { _id, title, photo, category, shortDescription } = blogs.find(blog => blog._id === id);
            const wishlistedBlog = { blog_id: _id, title, photo, category, shortDescription, email: user.email };

            const addedBlog = userWishlist.find(blog => blog.blog_id === id);

            // console.log(addedBlog);

            if (addedBlog) {
                Swal.fire({
                    icon: 'error',
                    title: 'Already Added!',
                })
            }

            else if (!addedBlog) {
                fetch('https://bucket-bee-server.vercel.app/wishlist', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(wishlistedBlog)
                })
                    .then(res => {
                        console.log(res);
                        if (res.ok) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Wishlisted Successfully!',
                            })
                        }
                        setUserWishlist([...userWishlist, wishlistedBlog]);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Please Log In First!',
            })
            navigate('/login')
        }
    }

    const handleSelect = e => {
        const selectedCategory = (e.target.value);
        // console.log(value);
        if (selectedCategory === 'All') {
            setFilteredBlogs(blogs)
        }
        else {
            const filtered = blogs.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredBlogs(filtered);
        }

    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        const filtered = blogs.filter(blog => blog.title.toLowerCase() === searchText.toLowerCase());
        setFilteredBlogs(filtered);
        e.target.reset();
    }

    // console.log(filteredBlogs);

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div>
            <Helmet>
                <title>All Blogs</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto">
                <div className="mx-4 sm:mx-0 text-sm sm:text-lg">
                    <div className="pt-10 pb-10 flex justify-center gap-2 sm:gap-6">
                        <select onChange={handleSelect} className="bg-white border-2 border-[#539aa0] text-[#08133a] w-20 sm:w-32 px-2 sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer">
                            <option value="All">All</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <div className="sm:max-w-xs">
                            <form className="flex items-center" onSubmit={handleSearch}>
                                <input className="bg-white border-2 border-[#539aa0] text-black w-[70%] h-12 px-4 rounded-tl-md rounded-bl-md outline-none" type="text" name="search" placeholder="Search By Title" required />
                                <input className="bg-[#539aa0] text-black w-[30%] h-12 px-2 rounded-tr-md rounded-br-md cursor-pointer" type="submit" value="Search" />
                            </form>
                        </div>
                    </div>
                    <div>
                        {
                            isPending === true ?
                                <div className="grid grid-cols-1 sm:grid-cols-3 mb-5 gap-9 mx-4">
                                    <Skeleton className="h-52" />
                                    <Skeleton className="h-52" />
                                    <Skeleton className="h-52" />
                                    <Skeleton className="h-52" />
                                    <Skeleton className="h-52" />
                                    <Skeleton className="h-52" />
                                </div>
                                :
                                <div>
                                    {
                                        filteredBlogs?.length === 0 ?
                                            <div className="text-2xl text-[#539aa0] font-bold text-center mb-8">
                                                No Blogs Added
                                            </div>
                                            :
                                            <div className="flex flex-wrap justify-center items-center gap-4 pb-5 sm:pb-16 mx-4">
                                                {
                                                    filteredBlogs?.map(blog =>
                                                        <div key={blog._id} className="w-96 p-5 rounded-md hover:scale-105 duration-200 border-2 border-[#539aa0] text-[#539aa0]">
                                                            <PhotoProvider>
                                                                <PhotoView src={blog.photo}>
                                                                    <img className="w-full h-52 object-cover cursor-pointer rounded-md" src={blog.photo} alt="" />
                                                                </PhotoView>
                                                            </PhotoProvider>
                                                            <div className="p-3 pb-0 space-y-1">
                                                                <div className="flex justify-between items-center">
                                                                    <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 mb-4 rounded-md inline-block text-white">{blog.category}</p>
                                                                    <button onClick={() => handleWishlist(blog._id)}><BsFillClipboardHeartFill></BsFillClipboardHeartFill></button>
                                                                </div>
                                                                <div className="h-16">
                                                                    {
                                                                        blog.title.length < 45 ?
                                                                            <h2 className="text-xl sm:text-2xl text-black italic font-extrabold">{blog.title}</h2>
                                                                            :
                                                                            <h2 className="text-xl sm:text-2xl text-black italic font-extrabold">{blog.title.slice(0, 45)}...</h2>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {
                                                                        blog.shortDescription.length < 40 ?
                                                                            <p className="text-sm">{blog.shortDescription}</p>
                                                                            :
                                                                            <p className="text-sm">{blog.shortDescription.slice(0, 40)}...</p>
                                                                    }
                                                                </div>
                                                                <Link to={`/blogs/${blog._id}`}>
                                                                    <button className="flex items-center gap-2 text-black mt-4">Read More <span className="mt-1 font-extrabold text-xl"><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllBlogs;