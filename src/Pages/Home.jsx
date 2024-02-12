import { useContext } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";
import Recommended from "../components/Recommended";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import Tags from "../components/Tags";
import FeaturedHome from "../components/FeaturedHome";

const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            {
                user ?
                    <Helmet>
                        <title>Home</title>
                        
                    </Helmet>
                    :
                    <Helmet>
                        <title>BucketBee</title>
                    </Helmet>
            }
            <div>
            </div>
            <NavBar></NavBar>
            <Banner></Banner>
            <FeaturedHome></FeaturedHome>
            <RecentBlogs></RecentBlogs>
            <Tags></Tags>
            <Recommended></Recommended>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;