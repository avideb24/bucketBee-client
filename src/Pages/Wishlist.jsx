
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Wishlist = () => {

    const { user, setLoading } = useContext(AuthContext);

    const [wishlist, setWishlist] = useState([]);

    const url = `http://localhost:5000/wishlist?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(true)
                console.log(data);
                setWishlist(data)
            })
    }, [url, setLoading])

    // console.log(wishlist);

    const handleDelete = id => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/wishlist/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        console.log(res);
                        if (res.ok) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted Successfully!',
                            })
                            const remaining = wishlist.filter(blog => blog._id !== id);
                            setWishlist(remaining);
                        }

                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                        console.error(err);
                    })
            }
        })

    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto py-16">
                {
                    wishlist.length === 0 ?
                        <div className="text-2xl text-yellow-500 font-bold text-center">
                            No Blogs Here
                        </div>
                        :
                        <div>
                            {
                                wishlist.map(blog =>
                                    <div key={blog._id} className="flex items-center justify-between gap-3 w-4/5 mx-auto p-4 bg-[#2c3b74] rounded-md mb-5">
                                        <div>
                                            <img className="w-32 h-32 object-contain rounded-md" src={blog.photo} alt="" />
                                            <p className="text-xs mt-2 text-center">{blog.category}</p>
                                        </div>
                                        <h2 className="text-xl text-yellow-500 font-bold">{blog.title}</h2>
                                        <p>{blog.shortDescription}</p>
                                        <Link to={`/blogs/${blog._id}`}>
                                            <button className="px-3 py-1 text-[#08133a] bg-yellow-500 rounded-md">Details</button>
                                        </Link>
                                        <button className="text-4xl text-yellow-500" onClick={() => handleDelete(blog._id)}><AiFillCloseCircle></AiFillCloseCircle></button>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Wishlist;