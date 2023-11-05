import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const location = useLocation();

    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <span className="loading loading-ring loading-lg"></span>;
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