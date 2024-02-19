import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
// import './FeaturedCss.css'


const FeaturedHome = () => {

    const { data: blogs, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://bucket-bee-server.vercel.app/blogs');
            return res.json();
        }
    });


    const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.longDescription.length - a.longDescription.length) : [];
    const featuredBlogs = sortedBlogs.slice(0, 10);
    // console.log(featuredBlogs[0]);
    const firstBlog = featuredBlogs[0];
    const restBlogs = featuredBlogs.slice(1);
    // console.log(restBlogs);


    return (
        <div className="max-w-7xl mx-auto py-5">
            <div className="mx-4">
                {
                    isLoading ? <div>Data Loading</div>
                        :
                        <div >
                            <h2 className="text-2xl sm:text-3xl text-[#363636] font-bold pt-2 sm:pt-10 pb-2 mx-4 mb-5 border-b-4 border-b-[#363636]">Featured Blogs</h2>
                            <div className="xl:grid xl:grid-cols-5 gap-6" data-aos="fade-up" data-aos-duration="1000">
                                <div className="mb-5 xl:mb-0 xl:col-span-3 border-2 rounded-md p-4">
                                    <img className="w-full h-80 object-cover rounded-md" src={firstBlog.photo} alt="" />
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 my-4 rounded-md inline-block text-white">{firstBlog.category}</span><br />
                                    <h3 className="blog-title text-2xl sm:text-4xl font-bold mb-3 inline-block relative">{firstBlog.title} </h3>
                                    <div>
                                        {
                                            firstBlog.shortDescription.length < 350 ?
                                                <p className="">{firstBlog.shortDescription}</p>
                                                :
                                                <p className="">{firstBlog.shortDescription.slice(0, 350)}...</p>
                                        }
                                    </div>
                                    <Link to={`/blogs/${firstBlog._id}`}>
                                    <button className="flex items-center gap-2 text-[#539aa0] mt-4">Read More <span className="mt-1 font-extrabold text-md text-[#539aa0] "><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                    </Link>
                                </div>
                                <div className="xl:col-span-2 flex flex-col gap-5">
                                    {
                                        restBlogs?.slice(0, 3)?.map(blog =>
                                            <div key={blog._id} className="flex gap-4 border-2 p-3 rounded-md">
                                                <img className="w-52 rounded-md h-36 object-cover" src={blog.photo} alt="" />
                                                <div className="">
                                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 mb-4 rounded-md inline-block text-sm text-white">{blog.category}</span> <br />
                                                    <h3 className="blog-title text-sm sm:text-xl font-bold mb-3 inline-block relative">{blog.title}</h3>
                                                    <Link to={`/blogs/${blog._id}`}>
                                                    <button className="flex items-center gap-2 text-sm text-[#539aa0] mt-2">Read More <span className="mt-1 font-extrabold text-md text-[#539aa0] "><AiOutlineArrowRight></AiOutlineArrowRight></span></button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default FeaturedHome;