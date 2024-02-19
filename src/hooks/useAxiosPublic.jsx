import axios from "axios";

const axiosPubllic = axios.create({
    baseURL: 'https://bucket-bee-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPubllic;
};

export default useAxiosPublic;