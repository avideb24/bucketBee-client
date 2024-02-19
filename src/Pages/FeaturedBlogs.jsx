import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import DataTable from "react-data-table-component";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import favicon from '../images/fav.png';
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import AnimatedCursor from "react-animated-cursor";

const ImageCell = ({ imageUrl }) => {
    return <img src={imageUrl} alt="Blog" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />;
};


const FeaturedBlogs = () => {

    const { isPending, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://bucket-bee-server.vercel.app/blogs');
            return res.json();
        }
    });


    const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.longDescription.length - a.longDescription.length) : [];
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
                <title>Featured Blogs</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <NavBar></NavBar>
            <div>
                {
                    isPending === true ?
                        <div className="grid grid-cols-4 mb-6 gap-6">
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                            <Skeleton className="h-6" />
                        </div>
                        :
                        <div className="max-w-7xl mx-auto mt-5 mb-12">
                            <DataTable columns={columns} data={featuredBlogs}></DataTable>
                        </div>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default FeaturedBlogs;

ImageCell.propTypes = {
    imageUrl: PropTypes.string
};