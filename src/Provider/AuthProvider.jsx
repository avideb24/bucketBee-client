import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [userName, setUserName] = useState('');

    const [userPhoto, setUserPhoto] = useState('');

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = provider => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    const authInfo = { user, loading, userName, userPhoto, wishlist, setLoading, setWishlist, setUserPhoto, setUserName, createUser, signInUser, signOutUser, googleSignIn }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.object,
}