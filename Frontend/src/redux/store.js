import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productsApi from './features/products/productsApi';
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // Adding space for readability
    [authApi.reducerPath]: authApi.reducer,
    auth:authReducer,   //importing authSlice
    [productsApi.reducerPath]:productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware), // Correct middleware name
});
