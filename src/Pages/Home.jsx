import Banner from "../components/Banner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;