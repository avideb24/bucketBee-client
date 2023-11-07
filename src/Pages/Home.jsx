import { useContext } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";
import Recommended from "../components/Recommended";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

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
            <NavBar></NavBar>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <Recommended></Recommended>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;