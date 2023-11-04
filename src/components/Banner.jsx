import bannerImg from '../images/banner-image.jpg'

const Banner = () => {
    return (
        <div>
            <div className='relative'>
                <img className='lg:h-96 w-full object-cover' src={bannerImg} alt="" />
                <div className='absolute w-full h-full left-0 top-0'>
                    <div className='flex h-full items-center'>
                        <div className='max-w-md space-y-3 mx-7 '>
                            <h3 className='text-3xl'>Welcome To</h3>
                            <h1 className='text-6xl italic text-yellow-500 font-bold'>BucketBee!!!</h1>
                            <p>Discover, Learn, Taste, Travel. Your Ultimate Source for Food Delights, Educational Insights, and Globetrotting Adventures. Bucket Bee - Where Every Experience is a Sweet Drop in Life &apos;s Honey Pot!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;