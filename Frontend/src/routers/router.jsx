// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/home';
import Category from '../pages/category/CategoryPage';
import CategoryPage from '../pages/category/CategoryPage';
import Search from '../pages/search/Search';
import ShopPage from '../pages/shop/ShopPage';

import Login from '../components/Login';
import Register from '../components/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {path:"/",element:<Home/>  },//importing the home.js in the router .router is the main page
            {path:"/categories/:categoryName", element:<CategoryPage/>},
            {path:'/search',element:<Search/>},
            {path:'/shop',element:<ShopPage/>},
            
        ]

    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
   
]);

export default router;
