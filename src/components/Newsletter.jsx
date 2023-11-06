import Swal from "sweetalert2";

const Newsletter = () => {

    const handleSubscribe = e => {
        e.preventDefault();
        const email = e.target.email.value;
        Swal.fire({
            icon: 'success',
            title: 'Thanks For Subscribe!',
        })
        console.log(email);
        e.target.reset()
    }

    return (
        <div className="max-w-7xl mx-auto text-center pb-16">
            <div className="mx-4 sm:mx-0">
                <h2 className="text-2xl sm:text-3xl text-yellow-500 font-bold">Subcribe To Our Newsletter</h2>
                <div className='w-60 h-1 mx-auto bg-yellow-500 mb-8 mt-4'></div>
                <p className="max-w-lg mx-auto text-sm font-medium mt-4">Stay in the Loop! Subscribe to Bucket Bee’s Newsletter for a Weekly Dose of Culinary Delights, Travel Tips, Educational Insights, and Exclusive Recipes. Let the Adventures Come to You!</p>
                <form onSubmit={handleSubscribe}>
                    <input className="w-56 sm:w-96 h-12 mt-4 rounded-tl-md rounded-bl-md bg-white text-black font-medium px-4 outline-none" type="email" name="email" placeholder="Your Email" required />
                    <input type="submit" className="h-12 px-3 bg-yellow-500 text-[#08133a] rounded-tr-md rounded-br-md cursor-pointer" value="Subscribe" />
                </form>
            </div>
        </div>
    );
};

export default Newsletter;