import { Link, useLoaderData } from "react-router-dom";
import { BsFillClipboardHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AllBlogs = () => {

    const { user } = useContext(AuthContext);

    const blogs = useLoaderData();

    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    const handleWishlist = id => {
        const { _id, title, photo, category, shortDescription } = blogs.find(blog => blog._id === id);
        const wishlistedBlog = { _id, title, photo, category, shortDescription, email: user.email };
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

    const handleSelect = e => {
        const selectedCategory = (e.target.value);
        // console.log(value);
        const filtered = blogs.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());
        setFilteredBlogs(filtered);
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        const filtered = blogs.filter(blog => blog.title.toLowerCase() === searchText.toLowerCase());
        setFilteredBlogs(filtered);
        e.target.reset();
    }

    // console.log(filteredBlogs);

    return (
        <div className="max-w-7xl mx-auto">
            <NavBar></NavBar>
            <div className="mx-4 sm:mx-0 text-sm sm:text-lg">
                <div className="pt-10 pb-10 flex justify-center gap-6">
                    <select onChange={handleSelect} className="bg-white text-[#08133a] w-16 sm:w-32 px-2 sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer">
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                    <div className="max-w-xs">
                        <form className="flex items-center" onSubmit={handleSearch}>
                            <input className="bg-white text-[#08133a] w-[70%] h-10 px-4 rounded-tl-md rounded-bl-md outline-none" type="text" name="search" placeholder="Search By Title" required />
                            <input className="bg-yellow-500 text-[#08133a] w-[30%] h-10 px-2 rounded-tr-md rounded-br-md cursor-pointer" type="submit" value="Search" />
                        </form>
                    </div>
                </div>
                <div>
                    {
                        filteredBlogs.length === 0 ?
                            <div className="text-2xl text-yellow-500 font-bold text-center">
                                No Blogs Added
                            </div>
                            :
                            <div className="flex flex-wrap justify-center items-center gap-4 pb-5 sm:pb-16 mx-4">
                                {
                                    filteredBlogs.map(blog =>
                                        <div key={blog._id} className="w-96 p-5 rounded-md bg-[#1d2c61]">
                                            <img className="w-full h-52 object-cover rounded-md" src={blog.photo} alt="" />
                                            <div className="p-3 pb-0 space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs sm:text-sm">{blog.category}</p>
                                                    <button onClick={() => handleWishlist(blog._id)}><BsFillClipboardHeartFill></BsFillClipboardHeartFill></button>
                                                </div>
                                                <h2 className="text-xl sm:text-2xl text-yellow-500 font-extrabold">{blog.title}</h2>
                                                <p>{blog.shortDescription}</p>
                                                <Link to={`/blogs/${blog._id}`}>
                                                    <button className="flex items-center gap-2 text-yellow-500 mt-4">Read More <span className="mt-1 font-extrabold text-xl"><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllBlogs;