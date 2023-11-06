import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const UpdatePage = () => {

    const { _id, title, photo, shortDescription, longDescription, category } = useLoaderData();

    const { user } = useContext(AuthContext);

    const [loadedUsers, setLoadedUsers] = useState([]);

    const loggedUser = loadedUsers.find(loadedUser => loadedUser?.userEmail === user?.email);

    // console.log(loggedUser);

    useEffect(() => {
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setLoadedUsers(data))
    },[])


    const [selectedCategory, setSelectedCategory] = useState('');

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

        fetch(`http://localhost:5000/blogs/${_id}`, {
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
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="max-w-7xl mx-auto">
        <NavBar></NavBar>
        <div className="my-1 sm:my-5 mx-4">
            <h2 className="text-center text-2xl sm:text-3xl text-yellow-500 font-bold pt-10 pb-2">Add Your Blog</h2>
            <div className='w-32 h-1 mx-auto bg-yellow-500 mb-8'></div>
            <form className="max-w-5xl mx-auto space-y-3" onSubmit={handleUpdateBlog}>
                <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="title" placeholder="Blog Title" defaultValue={title} /> <br />
                <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="photo" placeholder="Image URL" defaultValue={photo} /> <br />
                <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="shortDescription" placeholder="Short Description" defaultValue={shortDescription} /> <br />
                <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="longDescription" placeholder="Long Description" defaultValue={longDescription} /> <br />
                <select onChange={handleCategory} defaultValue={category} className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md">
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <input type="submit" className="w-full h-10 px-4 outline-none bg-yellow-500 text-black font-bold rounded-md cursor-pointer" value="Update" />
            </form>
        </div>
        <Footer></Footer>
    </div>
    );
};

export default UpdatePage;