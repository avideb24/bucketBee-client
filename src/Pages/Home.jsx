import Banner from "../components/Banner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";
import Recommended from "../components/Recommended";

const Home = () => {
    return (
        <div>
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