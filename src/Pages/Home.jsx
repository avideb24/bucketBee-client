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
import AnimatedCursor from "react-animated-cursor";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();


const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <div >
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