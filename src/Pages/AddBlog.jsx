import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import favicon from '../images/fav.png';
import { useNavigate } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor"

const AddBlog = () => {



    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    
    const [selectedCategory, setSelectedCategory] = useState('Food');

    const [loadedUsers, setLoadedUsers] = useState([]);

    const loggedUser = loadedUsers.find(loadedUser => loadedUser?.userEmail === user?.email);

    // console.log(loggedUser);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setLoadedUsers(data))
    }, [])


    const handleCategory = e => {
        const selectedValue = e.target.value;
        // console.log(selectedValue);
        setSelectedCategory(selectedValue);
    }

    const handleBlogSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const photo = form.photo.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;
        const category = selectedCategory;

        const addedBlog = { title, photo, shortDescription, longDescription, category, userName: loggedUser?.userName, userPhoto: loggedUser?.userPhoto, userEmail: user.email };
        console.log(addedBlog);

        fetch('https://bucket-bee-server.vercel.app/blogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedBlog)
        })
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Blog Added Successfully!',
                })
                form.reset();
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <AnimatedCursor
                innerSize={15}
                outerSize={35}
                innerScale={1}
                outerScale={2}
                outerAlpha={0}
                hasBlendMode={true}
                innerStyle={{
                    backgroundColor: '#eab308'
                }}
                outerStyle={{
                    border: '3px solid #eab308'
                }}
            />
            <Helmet>
                <title>Add Blog</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto">
                <div className="my-1 sm:my-5 py-5 sm:py-10 mx-4">
                    <h2 className="text-center text-2xl sm:text-3xl  text-[#363636] font-bold pb-2">Add Your Blog</h2>
                    <div className='w-32 h-1 mx-auto bg-[#363636] mb-8'></div>
                    <form className="max-w-5xl mx-auto space-y-3" onSubmit={handleBlogSubmit}>
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="title" placeholder="Blog Title" required/> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="photo" placeholder="Image URL" required/> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="shortDescription" placeholder="Short Description" required /> <br />
                        <input type="text" className="w-full h-10 px-4 outline-none border-2 border-[#539aa0] bg-white text-black font-normal rounded-md" name="longDescription" placeholder="Long Description" required /> <br />
                        <select onChange={handleCategory} required className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md">
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <input type="submit" className="w-full h-10 px-4 outline-none bg-[#539aa0] text-black font-bold rounded-md cursor-pointer" value="Submit" />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AddBlog;