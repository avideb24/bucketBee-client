import { useLoaderData } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const BlogDetails = () => {

    const { title, photo, shortDescription, longDescription, category } = useLoaderData();

    return (
        <div className="max-w-7xl mx-auto">
            <NavBar></NavBar>
            <div className="p-6 mx-5 bg-[#283669] rounded-md my-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl text-yellow-500 font-bold">{title}</h2>
                    <p className="max-w-md mx-auto">{shortDescription}</p>
                </div>
                <div>
                    <img className="w-full h-96 object-cover rounded-md mb-2" src={photo} alt="" />
                    <p className="text-sm text-yellow-500">{category}</p>
                </div>
                <div className="mt-3"><span className="text-xl">Description:</span> {longDescription}</div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BlogDetails;