import { useContext, useEffect, useState } from "react";
import { BsFillClipboardHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    },[user?.email])

    // console.log(userWishlist);

    const handleWishlist = id => {
        const { _id, title, photo, category, shortDescription } = blogs.find(blog => blog._id === id);
        const wishlistedBlog = { _id, title, photo, category, shortDescription, email: user.email };

        const addedBlog = userWishlist.find(blog => blog._id === _id)

        if(!addedBlog){
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
            })
            .catch(err => {
                console.error(err);
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Already Added!',
            })
        }
    }


    return (
        <div className="max-w-7xl mx-auto py-8 sm:py-16">
            <h2 className="text-center text-2xl sm:text-3xl text-yellow-500 font-bold pt-2 sm:pt-10 pb-2">Recent Blogs</h2>
            <div className='w-32 h-1 mx-auto bg-yellow-500 mb-8'></div>
            <div className="flex flex-wrap justify-center items-start gap-4">
                {
                    blogs.slice(0, 6).map(blog =>
                        <div key={blog._id} className="w-96 p-5 mx-4 sm:mx-0 rounded-md bg-[#1d2c61] flex flex-col">
                            <img className="w-full h-52 object-cover rounded-md" src={blog.photo} alt="" />
                            <div className="p-3 pb-0 space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs sm:text-sm">{blog.category}</p>
                                    <button onClick={() => handleWishlist(blog._id)}><BsFillClipboardHeartFill></BsFillClipboardHeartFill></button>
                                </div>
                                <h2 className="text-xl sm:text-2xl text-yellow-500 font-extrabold">{blog.title}</h2>
                                <div>
                                    {
                                        blog.shortDescription.length < 40 ? 
                                        <p className="text-sm">{blog.shortDescription}</p>
                                        :
                                        <p className="text-sm">{blog.shortDescription.slice(0,40)}...</p>
                                    }
                                </div>
                            </div>
                            <div className="grow">
                                <Link to={`/blogs/${blog._id}`}>
                                    <button className="flex items-center gap-2 text-yellow-500 mt-4">Read More <span className="mt-1 font-extrabold text-xl"><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RecentBlogs;