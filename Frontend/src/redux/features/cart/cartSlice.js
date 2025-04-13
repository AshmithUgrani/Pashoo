import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  products: [],  // Array to store the products in the cart
  totalItems: 0,  // Keep track of total items (including quantity)
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05, // Default tax rate (5%)
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find((product) => product._id === action.payload._id);
    
      if (!existingProduct) {
        // Add a unique _id if it doesn't exist
        const productWithId = { ...action.payload, _id: action.payload._id || Date.now().toString() };
        state.products.push({ ...productWithId, quantity: 1 });
      } else {
        existingProduct.quantity += 1;
      }
    
      // Recalculate totals
      state.totalItems = state.products.reduce((sum, product) => sum + product.quantity, 0);
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
    updateQuantity: (state, action) => {
      const productToUpdate = state.products.find((product) => product._id === action.payload.id);
    
      if (productToUpdate) {
        if (action.payload.type === 'increment') {
          productToUpdate.quantity += 1;
        } else if (action.payload.type === 'decrement' && productToUpdate.quantity > 1) {
          productToUpdate.quantity -= 1;
        }
    
        // Recalculate totals after updating the quantity
        state.totalItems = state.products.reduce((sum, product) => sum + product.quantity, 0);
        state.totalPrice = state.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
        state.tax = state.totalPrice * state.taxRate;
        state.grandTotal = state.totalPrice + state.tax;
      }
    },
    removeFromCart: (state, action) => {
      // Remove the product with the specified id
      state.products = state.products.filter((product) => product._id !== action.payload.id);
    
      // Recalculate totals after removal
      state.totalItems = state.products.reduce((sum, product) => sum + product.quantity, 0);
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
    clearCart:(state)=>{
      state.products=[];
      state.totalItems= 0,  // Keep track of total items (including quantity)
     state.totalPrice=0,
     state.tax=0,
    state.taxRate=0.05, // Default tax rate (5%)
    state.grandTotal=0;
    },
    },
});

// Action creators
export const { addToCart, removeFromCart,updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;