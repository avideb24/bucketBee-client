import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import DataTable from "react-data-table-component";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

const ImageCell = ({ imageUrl }) => {
    return <img src={imageUrl} alt="Blog" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />;
};


const FeaturedBlogs = () => {


    const blogs = useLoaderData()

    const sortedBlogs = blogs.sort((a, b) => b.longDescription.length - a.longDescription.length);

    const featuredBlogs = sortedBlogs.slice(0, 10);
    // console.log(featuredBlogs);

    const columns = [
        {
            name: 'Serial No.',
            cell: (row, index) => index + 1,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Owner',
            selector: row => row.userName,
        },
        {
            name: 'Picture',
            cell: row => <ImageCell imageUrl={row.userPhoto} />,
        },
    ]

    return (
        <div>
            <Helmet>
                <title>Featured Blogs</title>
            </Helmet>
            <NavBar></NavBar>
            <DataTable columns={columns} data={featuredBlogs}></DataTable>
            <Footer></Footer>
        </div>
    );
};

export default FeaturedBlogs;

ImageCell.propTypes = {
    imageUrl: PropTypes.string
};