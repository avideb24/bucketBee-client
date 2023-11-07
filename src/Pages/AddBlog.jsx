import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const AddBlog = () => {

    const { user } = useContext(AuthContext);

    const [loadedUsers, setLoadedUsers] = useState([]);

    const loggedUser = loadedUsers.find(loadedUser => loadedUser?.userEmail === user?.email);

    // console.log(loggedUser);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setLoadedUsers(data))
    }, [])


    const [selectedCategory, setSelectedCategory] = useState('');

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

        fetch('http://localhost:5000/blogs', {
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
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <Helmet>
                <title>Add Blog</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto">
                <div className="my-1 sm:my-5 py-5 sm:py-10 mx-4">
                    <h2 className="text-center text-2xl sm:text-3xl  text-[#363636] font-bold pb-2">Add Your Blog</h2>
                    <div className='w-32 h-1 mx-auto bg-[#539aa0] mb-8'></div>
                    <form className="max-w-5xl mx-auto space-y-3" onSubmit={handleBlogSubmit}>
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="title" placeholder="Blog Title" /> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="photo" placeholder="Image URL" /> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md" name="shortDescription" placeholder="Short Description" /> <br />
                        <input type="text" className="w-full h-10 px-4 outline-none border-2 border-[#539aa0] bg-white text-black font-normal rounded-md" name="longDescription" placeholder="Long Description" /> <br />
                        <select onChange={handleCategory} className="w-full h-10 px-4 border-2 border-[#539aa0] outline-none bg-white text-black font-normal rounded-md">
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