// import { motion } from "framer-motion";
import './BannerText.css';

const Banner = () => {

    // animate={{ x: [100, 0] }}
    // transition={{ ease: "easeOut", duration: 0.8 }}

    return (
        <div
           
        >
            <div className="bg-slate-100 py-16">
                <div className='max-w-3xl mx-auto  px-7 '>
                    <div className="flex justify-start">
                        <h3 className='text-lg sm:text-2xl lg:text-3xl text-[#266166] mb-3'>Welcome To</h3>
                    </div>
                    <div className="flex justify-center">
                        <h1 className='banner-title text-3xl sm:text-4xl lg:text-6xl italic font-bold flex items-center gap-1  sm:items-end'><p className="inline-block text-5xl sm:text-7xl md:text-9xl text-yellow-500 banner-b-text mb-5 md:my-0 sm:pb-0 md:pb-0 lg:pb-0">B</p><span>ucket</span><p className="inline-block text-5xl sm:text-7xl md:text-9xl text-yellow-500 banner-b-text mb-5 md:my-0 sm:pb-0 md:pb-0 lg:pb-0">B</p><span>ee!!!</span></h1>
                    </div>
                    <div className="flex justify-end text-[#347c83]">
                        <p>Read, Write & Explore!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;