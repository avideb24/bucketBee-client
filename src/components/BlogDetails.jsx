import { useLoaderData } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const BlogDetails = () => {

    const {  userName, userPhoto } = useContext(AuthContext);

    const { _id, title, photo, shortDescription, longDescription, category } = useLoaderData();

    const handleComment = e => {
        e.preventDefault();

        const commentText = e.target.commentBox.value;
        

        const comment = {commentText, _id, userName, userPhoto};
        console.log(comment);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <NavBar></NavBar>
            <div className="p-6 mx-5 bg-[#283669] rounded-md my-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl text-yellow-500 font-bold mb-2">{title}</h2>
                    <p className="max-w-md mx-auto">{shortDescription}</p>
                </div>
                <div>
                    <img className="w-full h-96 object-cover rounded-md mb-2" src={photo} alt="" />
                    <p className="text-sm text-yellow-500">{category}</p>
                </div>
                <div className="mt-3"><span className="text-xl">Description:</span> {longDescription}</div>
                <div className="w-full h-2 bg-slate-500 my-5 rounded-md"></div>
                <div>
                    <form onSubmit={handleComment}>
                        <textarea className="bg-white text-black rounded-md outline-none p-3" name="commentBox" id="" cols="50" rows="10" placeholder="Leave A Comment..."></textarea>
                        <input type="submit" value="Comment" />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BlogDetails;