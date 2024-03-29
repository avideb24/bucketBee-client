import { useContext, useEffect, useState } from "react";
import { BsFillClipboardHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { useQuery } from "@tanstack/react-query";

const RecentBlogs = () => {

    const navigate = useNavigate();

    // const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    const [userWishlist, setUserWishlist] = useState([]);

    // const [blogs, setBlogs] = useState([]);


    const { data: blogs, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://bucket-bee-server.vercel.app/blogs');
            const data = await res.json();
            const sortedBlogs = data.map(blog => ({
                ...blog,
                numericDate: new Date(blog.date).getTime() / 1000
            })).sort((a, b) => b.numericDate - a.numericDate);

            return sortedBlogs;
        },
    });

    // useEffect(() => {
    //     fetch('https://bucket-bee-server.vercel.app/blogs')
    //         .then(res => res.json())
    //         .then(data => {
    //             const sortedBlogs = data.map(blog => ({
    //                 ...blog,
    //                 numericDate: new Date(blog.date).getTime() / 1000
    //             })).sort((a, b) => b.numericDate - a.numericDate);
    //             // console.log(sortedBlogs);
    //             setBlogs(sortedBlogs);
    //             setLoading(false);
    //         })
    // }, [])


    useEffect(() => {
        fetch(`https://bucket-bee-server.vercel.app/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserWishlist(data))
    }, [user?.email])

    // console.log(userWishlist);

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

    if (isError) {
        return <span>Error: {error.message}</span>
    }




    return (
        <div className="max-w-7xl mx-auto py-8 sm:pb-16">
            <h2 className="text-2xl sm:text-3xl text-[#363636] font-bold pt-2 sm:pt-10 pb-2 mx-4 mb-5 border-b-4 border-b-[#363636]">Recent Blogs</h2>
            <div>
                {
                    isLoading ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 mx-4">
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
                                blogs.length === 0 ?
                                    <p className="text-2xl text-[#363636] font-normal text-center my-10">No Blogs Added!</p>
                                    :
                                    <div className="flex flex-wrap justify-center items-start gap-4 bg-white p-4 rounded-md" data-aos="fade-up" data-aos-duration="1000">
                                        {
                                            blogs.slice(0, 6).map(blog =>
                                                <div key={blog._id} className="w-96 bg-white p-5 mx-4 sm:mx-0 rounded-md border-2 border-[#539aa0] flex flex-col hover:scale-105 duration-200">
                                                    <PhotoProvider>
                                                        <PhotoView src={blog.photo}>
                                                            <img className="w-full h-52 object-cover cursor-pointer rounded-md" src={blog.photo} alt="" />
                                                        </PhotoView>
                                                    </PhotoProvider>
                                                    <div className="p-3 pb-0 space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 mb-4 rounded-md inline-block text-white">{blog.category}</p>
                                                            <button className="text-[#539aa0]" onClick={() => handleWishlist(blog._id)}><BsFillClipboardHeartFill></BsFillClipboardHeartFill></button>
                                                        </div>
                                                        <h2 className="text-xl h-[65px] sm:text-2xl text-[#363636] italic font-extrabold overflow-hidden">{blog.title}</h2>                                                      
                                                        <div>
                                                            {
                                                                blog.shortDescription.length < 40 ?
                                                                    <p className="text-sm">{blog.shortDescription}</p>
                                                                    :
                                                                    <p className="text-sm">{blog.shortDescription.slice(0, 40)}...</p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="grow">
                                                        <Link to={`/blogs/${blog._id}`}>
                                                            <button className="flex items-center gap-2 text-[#539aa0] mt-4 ml-3">Read More <span className="mt-1 font-extrabold text-xl text-[#539aa0] "><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
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
    );
};

export default RecentBlogs;



