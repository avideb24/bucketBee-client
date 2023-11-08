import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import ErrorPage from "../components/ErrorPage";
import Home from "../Pages/Home";
import AddBlog from "../Pages/AddBlog";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import Wishlist from "../Pages/Wishlist";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../components/BlogDetails";
import UpdatePage from "../Pages/UpdatePage";


const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addBlog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: '/allBlogs',
                element: <AllBlogs></AllBlogs>,
                loader: () => fetch('https://bucket-bee-server.vercel.app/blogs')
            },
            {
                path: '/featuredBlogs',
                element: <FeaturedBlogs></FeaturedBlogs>,
                loader: () => fetch('https://bucket-bee-server.vercel.app/blogs')
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails></BlogDetails>,
                loader: ({params}) => fetch(`https://bucket-bee-server.vercel.app/blogs/${params.id}`)
            },
            {
                path: '/updateBlog/:id',
                element: <PrivateRoute><UpdatePage></UpdatePage></PrivateRoute>,
                loader: ({params}) => fetch(`https://bucket-bee-server.vercel.app/blogs/${params.id}`)
            }
        ]
    }
])

export default Routes;