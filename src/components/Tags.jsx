import { useEffect, useState } from "react";

const Tags = () => {

    const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    fetch("https://bucket-bee-server.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Extract unique categories from the fetched blog data
        const categoriesSet = new Set(data.map((blog) => blog.category).filter(category => category.trim() !== ""));
        const categoriesArray = Array.from(categoriesSet);
        setUniqueCategories(categoriesArray);
      });
  }, []);

    return (
        <div className="max-w-7xl mx-auto pb-6 sm:pb-10">
      <h2 className="text-2xl sm:text-3xl text-[#363636] text-center font-bold">
        Popular Tags
      </h2>
      <div className="w-40 h-1 mx-auto bg-[#363636] mb-8 mt-4"></div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {uniqueCategories.map((category) => (
          <div key={category} className="text-center hover:text-[#363636] border-2 border-[#539aa0]  bg-transparent text-[#539aa0] hover:bg-[#539aa0] px-5 py-3 rounded-full font-bold duration-200">
            {category}
          </div>
        ))}
      </div>
    </div>
    );
};

export default Tags;