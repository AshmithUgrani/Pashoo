import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModel from '../pages/shop/CartModel';

import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice'; // Assuming you have the logout action defined

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const adminDropDownMenus = [
    { label: "Dashboard", path: '/dashboard/admin' },
    { label: "Manage Items", path: '/dashboard/manage-products' },
    { label: "All Orders", path: '/dashboard/manage-orders' },
    { label: "Add New Post", path: '/dashboard/add-new-post' },
  ];

  const userDropDownMenus = [
    { label: "Dashboard", path: '/dashboard' },
    { label: "Profile", path: '/dashboard/profile' },
    { label: "Payments", path: '/dashboard/payments' },
    { label: "Orders", path: '/dashboard/orders' },
  ];

  const dropdownMenus = user?.role === 'admin' ? adminDropDownMenus : userDropDownMenus;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Call logout API
      dispatch(logout()); // Dispatch the logout action to clear user data from Redux store
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contacts</Link>
          </li>
        </ul>

        <div className="nav__logo">
          <Link to="/">PASHOO<span>.</span></Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-red-700">
              <i className="ri-shopping-bag-4-fill"></i>
              <sup className="text-sm inline-block px-1 text-white rounded-full bg-red-700 text-center w-5 h-5">
                {totalItems}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />

                {isDropDownOpen && (
                  <div className="absolute left-120 w-48 bg-white border-gray-200 rounded-lg shadow-lg z-50" style={{ marginTop: '0.5rem', padding: '0.5' }}>
                    <ul className='font-medium space-y-4' style={{ padding: "0.5rem" }}>
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}  
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li><Link onClick={(e) => { e.preventDefault(); handleLogout(); }} className='dropdown-items'>Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </header>
  );
};

export default Navbar;
