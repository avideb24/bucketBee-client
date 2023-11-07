import { useContext, useEffect, useState } from "react";
import { BsFillClipboardHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const RecentBlogs = () => {

    const { user } = useContext(AuthContext);

    const [userWishlist, setUserWishlist] = useState([]);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                const sortedBlogs = data.map(blog => ({
                    ...blog,
                    numericDate: new Date(blog.date).getTime() / 1000
                })).sort((a, b) => b.numericDate - a.numericDate);
                // console.log(sortedBlogs);
                setBlogs(sortedBlogs)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserWishlist(data))
    }, [user?.email])

    // console.log(userWishlist);

    const handleWishlist = id => {
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
            fetch('http://localhost:5000/wishlist', {
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


    return (
        <div className="max-w-7xl mx-auto py-8 sm:pb-16">
            <h2 className="text-2xl sm:text-3xl text-[#363636] font-bold pt-2 sm:pt-10 pb-2 mx-4">Recent Blogs</h2>
            <div className='w-full h-1 bg-[#363636] mb-8 mx-4'></div>
            <div>
                {
                    blogs.length === 0 ?
                        <p className="text-2xl text-[#363636] font-normal text-center my-10">No Blogs Added!</p>
                        :
                        <motion.div className="flex flex-wrap justify-center items-start gap-4"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9 }}
                        >
                            {
                                blogs.slice(0, 6).map(blog =>
                                    <div key={blog._id} className="w-96 p-5 mx-4 sm:mx-0 rounded-md hover:scale-105 duration-200 border-2 border-[#539aa0] flex flex-col">
                                        <img className="w-full h-52 object-cover rounded-md" src={blog.photo} alt="" />
                                        <div className="p-3 pb-0 space-y-1">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs sm:text-sm">{blog.category}</p>
                                                <button className="text-[#539aa0]" onClick={() => handleWishlist(blog._id)}><BsFillClipboardHeartFill></BsFillClipboardHeartFill></button>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl text-[#363636] italic font-extrabold">{blog.title}</h2>
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
                                                <button className="flex items-center gap-2 text-[#363636] mt-4">Read More <span className="mt-1 font-extrabold text-xl text-[#363636] "><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                }
            </div>
        </div>
    );
};

export default RecentBlogs;