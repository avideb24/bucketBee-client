import { Link, useLoaderData } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BlogDetails = () => {

    const { _id, title, photo, shortDescription, longDescription, category, userEmail } = useLoaderData();

    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);

    const [blogComments, setBlogComments] = useState([]);

    const [users, setUsers] = useState([]);

    const loggedUser = users.find(userDB => userDB.userEmail === user?.email);

    // console.log(loggedUser.userEmail);
    // console.log(userEmail);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/comments')
            .then(res => res.json())
            .then(data => {
                setComments(data);
                const thisBlogComments = comments.filter(comment => comment.blog_id === _id);
                setBlogComments(thisBlogComments);
            })
    }, [_id, comments])


    const handleComment = e => {
        e.preventDefault();

        const commentText = e.target.commentBox.value;

        const comment = { commentText, blog_id: _id, userEmail: user.email, userName: loggedUser?.userName, userPhoto: loggedUser?.userPhoto };
        // console.log(comment);
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Comment Added Successfully!',
                })
                e.target.reset();
                setBlogComments([...blogComments, comment])

            })
            .then(err => console.error(err))
    }


    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto">
                <div className="p-6 mx-5 border-2 border-[#539aa0] rounded-md my-5 sm:my-10 text-sm sm:text-md">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl text-[#539aa0] font-bold mb-2">{title}</h2>
                        <p className="max-w-md mx-auto">{shortDescription}</p>
                    </div>
                    <div>
                        <img className="w-full sm:h-72 md:h-80 lg:h-96 object-cover rounded-md mb-2" src={photo} alt="" />
                        <p className="text-sm text-[#539aa0]">{category}</p>
                    </div>
                    <div className="mt-3"><span className="text-xl">Description:</span> {longDescription}</div>

                    <div>
                        {
                            loggedUser?.userEmail === userEmail &&
                            <Link to={`/updateBlog/${_id}`}>
                                <button className="bg-[#539aa0] px-4 py-2 rounded-md text-black mt-5">Update Blog</button>
                            </Link>
                        }
                    </div>

                    <div className="w-full h-2 bg-slate-500 my-5 rounded-md"></div>

                    <div className="my-4">
                        {
                            blogComments.map(comment =>
                                <div key={comment._id} className="flex gap-5 mb-3">
                                    <img className="w-9 h-9 object-cover rounded-full" src={comment.userPhoto} alt="" />
                                    <div>
                                        <h2 className="text-[#539aa0]">{comment.userName}</h2>
                                        <p className="text-sm">{comment.commentText}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        {
                            loggedUser?.userEmail === userEmail
                                ?
                                <p className="text-red-600">You Can&apos;t Comment On Your Own Blog.</p>
                                :
                                <div className="max-w-lg">
                                    <form onSubmit={handleComment} className="flex items-end gap-4 mt-6">
                                        <textarea className="bg-white text-black rounded-md outline-none border-2 border-[#539aa0] p-3 w-full" name="commentBox" placeholder="Leave A Comment..."></textarea>
                                        <input className="bg-[#539aa0] px-4 py-2 rounded-md text-black cursor-pointer h-10" type="submit" value="Comment" />
                                    </form>
                                </div>
                        }
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BlogDetails;