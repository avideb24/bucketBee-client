import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import favicon from '../images/fav.png';

const BlogDetails = () => {

    const navigate = useNavigate();

    const { _id, title, photo, shortDescription, longDescription, category, userEmail } = useLoaderData();

    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);

    const [blogComments, setBlogComments] = useState([]);

    const [users, setUsers] = useState([]);

    const loggedUser = users.find(userDB => userDB.userEmail === user?.email);

    // console.log(loggedUser.userEmail);
    // console.log(userEmail);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/comments')
            .then(res => res.json())
            .then(data => {
                setComments(data);
                const thisBlogComments = comments.filter(comment => comment.blog_id === _id);
                setBlogComments(thisBlogComments);
            })
    }, [_id, comments])


    const handleComment = e => {
        e.preventDefault();

        if (user) {
            const commentText = e.target.commentBox.value;

            const comment = { commentText, blog_id: _id, userEmail: user.email, userName: loggedUser?.userName, userPhoto: loggedUser?.userPhoto };
            // console.log(comment);
            fetch('https://bucket-bee-server.vercel.app/comments', {
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
        
        else{
            Swal.fire({
                icon: 'error',
                title: 'Please Log In First!',
            })
            navigate('/login')
        }

    }


    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto">
                <div className="p-6 mx-5 border-2 border-[#539aa0] rounded-md my-5 sm:my-10 text-sm sm:text-md">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl text-[#539aa0] font-bold mb-2">{title}</h2>
                        <p className="max-w-md mx-auto">{shortDescription}</p>
                    </div>
                    <div>
                        <PhotoProvider>
                            <PhotoView src={photo}>
                                <img className="w-full sm:h-72 md:h-80 lg:h-96 cursor-pointer object-cover rounded-md mb-2" src={photo} alt="" />
                            </PhotoView>
                        </PhotoProvider>
                        <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 mb-4 rounded-md inline-block text-white">{category}</p>
                    </div>
                    <div className="mt-3 text-justify"><span className="text-xl text-[#2c2b2b]">Description:</span> {longDescription}</div>

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
                                    <PhotoProvider>
                                        <PhotoView src={comment.userPhoto}>
                                            <img className="w-9 h-9 object-cover cursor-pointer rounded-full" src={comment.userPhoto} alt="" />
                                        </PhotoView>
                                    </PhotoProvider>
                                    <div>
                                        <h2 className="text-[#2c2b2b]">{comment.userName}</h2>
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
                                        <textarea className="bg-white text-black rounded-md outline-none border-2 border-[#539aa0] p-3 w-full" name="commentBox" placeholder="Leave A Comment..." required ></textarea>
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