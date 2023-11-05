import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const AddBlog = () => {

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

        const addedBlog = { title, photo, shortDescription, longDescription, category }
        // console.log(addedBlog);

        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedBlog)
        })
        .then(res=> {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

    }


    return (
        <div className="max-w-7xl mx-auto">
            <NavBar></NavBar>
            <div className="my-5">
                <h2 className="text-center text-3xl text-yellow-500 font-bold pt-10 pb-2">Add Your Blog</h2>
                <div className='w-32 h-1 mx-auto bg-yellow-500 mb-8'></div>
                <form className="max-w-5xl mx-auto space-y-3" onSubmit={handleBlogSubmit}>
                    <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="title" placeholder="Blog Title" /> <br />
                    <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="photo" placeholder="Image URL" /> <br />
                    <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="shortDescription" placeholder="Short Description" /> <br />
                    <input type="text" className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md" name="longDescription" placeholder="Long Description" /> <br />
                    <select onChange={handleCategory} className="w-full h-10 px-4 outline-none bg-white text-black font-normal rounded-md">
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                    <input type="submit" className="w-full h-10 px-4 outline-none bg-yellow-500 text-black font-bold rounded-md cursor-pointer" value="Submit" />
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AddBlog;