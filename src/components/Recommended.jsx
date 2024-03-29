import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
// import { useQuery } from "@tanstack/react-query";

const Recommended = () => {

    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
    }, [])


    // const { data: blogs, isLoading, isError, error } = useQuery({
    //     queryKey: ['blogs'],
    //     queryFn: async () => {
    //         const res = await fetch('https://bucket-bee-server.vercel.app/blogs');
    //         return res.json();
    //     }
    // })


    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }


    return (
        <div className="max-w-7xl mx-auto pb-10">
            <h2 className="text-2xl sm:text-3xl text-[#363636] font-bold pt-2 sm:pt-10 pb-2 mx-4 mb-5 border-b-4 border-b-[#363636]">Recommended</h2>
            <div className="mx-4 bg-slate-100 p-4 rounded-md ">
                <h2 className="text-sm font-normal mb-3 text-[#363636]">You might also like...</h2>
                <div>
                    {
                        loading ?
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <Skeleton className="h-40" />
                                <Skeleton className="h-40" />
                                <Skeleton className="h-40" />
                                <Skeleton className="h-40" />
                            </div>
                            :
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {
                                    blogs.slice(0, 4).map(blog =>
                                        <div key={blog._id} className="border-2 border-[#539aa0] origin-center hover:rotate-3 duration-200 p-3 rounded-md" data-aos="fade-up" data-aos-duration="1000">
                                            <PhotoProvider>
                                                <PhotoView src={blog.photo}>
                                                    <img className="w-full h-16 sm:h-20 md:h-30 cursor-pointer lg:h-40 object-cover rounded-md" src={blog.photo} alt="" />
                                                </PhotoView>
                                            </PhotoProvider>
                                            <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 mt-3 rounded-md inline-block text-xs text-white">{blog.category}</p>
                                            <h3 className="sm:text-md md:text-xl h-[58px] font-bold mt-1 text-[#363636] overflow-hidden">{blog.title}</h3>
                                            <Link to={`/blogs/${blog._id}`}>
                                                <button className="flex items-center gap-2 text-[#539aa0] mt-2">Read More <span className="mt-1 font-extrabold text-xs md:text-xl text-[#539aa0]"><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
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