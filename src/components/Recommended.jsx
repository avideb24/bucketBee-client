import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const Recommended = () => {

    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
    }, [])


    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="mx-4 bg-slate-100 p-4 rounded-md ">
                <h2 className="text-sm font-normal mb-3 text-[#363636]">You might also like...</h2>
                <div>
                    {
                        loading ?
                            <div className="grid grid-cols-4 gap-6">
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>
                            :
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {
                                    blogs.slice(0, 4).map(blog =>
                                        <div key={blog._id} className="border-2 border-[#539aa0] origin-center hover:rotate-3 duration-200 p-3 rounded-md">
                                            <PhotoProvider>
                                                <PhotoView src={blog.photo}>
                                                    <img className="w-full h-16 sm:h-20 md:h-30 cursor-pointer lg:h-40 object-cover rounded-md" src={blog.photo} alt="" />
                                                </PhotoView>
                                            </PhotoProvider>
                                            <h3 className="sm:text-md md:text-xl font-bold mt-1 text-[#363636]">{blog.title}</h3>
                                            <Link to={`/blogs/${blog._id}`}>
                                                <button className="flex items-center gap-2 text-[#363636] mt-2">Read More <span className="mt-1 font-extrabold text-xs md:text-xl"><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Recommended;