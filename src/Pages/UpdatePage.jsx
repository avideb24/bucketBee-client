import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import favicon from '../images/fav.png';
import AnimatedCursor from "react-animated-cursor";

const UpdatePage = () => {

    const nagivate = useNavigate();

    const { _id, title, photo, shortDescription, longDescription, category } = useLoaderData();

    const { user } = useContext(AuthContext);

    const [loadedUsers, setLoadedUsers] = useState([]);

    const loggedUser = loadedUsers.find(loadedUser => loadedUser?.userEmail === user?.email);

    // console.log(loggedUser);

    useEffect(() => {
        fetch('https://bucket-bee-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setLoadedUsers(data))
    }, [])


    const [selectedCategory, setSelectedCategory] = useState('Food');

    const handleCategory = e => {
        const selectedValue = e.target.value;
        // console.log(selectedValue);
        setSelectedCategory(selectedValue);
    }


    const handleUpdateBlog = e => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const photo = form.photo.value;
        const shortDescription = form.shortDescription.value;
        const longDescription = form.longDescription.value;
        const category = selectedCategory;

        const updatedBlog = { title, photo, shortDescription, longDescription, category, userName: loggedUser?.userName, userPhoto: loggedUser?.userPhoto, userEmail: user.email };
        // console.log(updatedBlog);

        fetch(`https://bucket-bee-server.vercel.app/blogs/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedBlog)
        })
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated Successfully!',
                })
                form.reset();
                nagivate(`/blogs/${_id}`)
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
                <title>Update Blog</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div className="max-w-7xl mx-auto pb-6">
                <div className="my-1 sm:my-5 mx-4">
                    <h2 className="text-center text-2xl sm:text-3xl text-[#363636] font-bold pt-10 pb-2">Update Your Blog</h2>
                    <div className='w-32 h-1 mx-auto bg-[#363636] mb-8'></div>
                    <form className="max-w-5xl mx-auto space-y-3 text-[#363636]" onSubmit={handleUpdateBlog}>
                        <input type="text" className="w-full h-10 px-4 border-2 outline-none bg-white border-[#539aa0] font-normal rounded-md" name="title" placeholder="Blog Title" defaultValue={title} /> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 outline-none bg-white border-[#539aa0] font-normal rounded-md" name="photo" placeholder="Image URL" defaultValue={photo} /> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 outline-none bg-white border-[#539aa0] font-normal rounded-md" name="shortDescription" placeholder="Short Description" defaultValue={shortDescription} /> <br />
                        <input type="text" className="w-full h-10 px-4 border-2 outline-none bg-white border-[#539aa0] font-normal rounded-md" name="longDescription" placeholder="Long Description" defaultValue={longDescription} /> <br />
                        <select onChange={handleCategory} defaultValue={category} className="w-full h-10 px-4 border-2 outline-none bg-white border-[#539aa0] font-normal rounded-md">
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <input type="submit" className="w-full h-10 px-4 outline-none bg-[#539aa0] text-[#363636] font-bold rounded-md cursor-pointer" value="Update" />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UpdatePage;