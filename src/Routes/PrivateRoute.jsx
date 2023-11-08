import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const PrivateRoute = ({children}) => {

    const location = useLocation();

    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <Skeleton count={3} className="mt-10 sm:mt-16 h-52 rounded-full"></Skeleton>;
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRoute;


PrivateRoute.propTypes = {
    children: PropTypes.node
}