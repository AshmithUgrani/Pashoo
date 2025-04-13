import React from 'react';
import OrderSummery from './OrderSummery';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';


const CartModel = ({ products, isOpen, onClose }) => {
  const cartItems = products || []; // Fallback to empty array if products is undefined or null

  const dispatch=useDispatch();

  const handleQuantity=(type,id)=>{
       const payload={type,id}
       dispatch(updateQuantity(payload));
  };

  const handleRemove=(e,id)=>{
    e.preventDefault();
    dispatch(removeFromCart({id}));
  };

  return (
    <div 
      className={`fixed inset-0 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`} 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div 
        className={`fixed right-0 top-0 w-full sm:w-2/3 md:w-1/3 bg-white h-full overflow-auto transition-transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} 
        style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div style={{ marginBottom: "5rem", marginTop: '0.85rem', padding: "1rem" }}>
          <h2 className="text-xl font-semibold mb-4 text-left">Your Cart</h2>
          
          {/* Close Button */}
          <div className="flex justify-between items-center" style={{ marginTop: '5rem' }}>
            <div 
              className="absolute top-4 right-4 text-black cursor-pointer" 
              onClick={onClose}
            >
              <i className="ri-close-line text-3xl bg-black p-1 text-white"></i>
            </div>
          </div>

          {/* Cart details */}
          <div className='cart-items'>
            {cartItems.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col md:flex-row md:items-center shadow-md md:p-5 p-2" style={{ marginBottom: '1rem' }}>
                    {/* Index Number */}
                    <div style={{padding:"1rem"}}>
                      <span className='bg-red-500 text-white rounded-full' style={{ marginRight: '0.25rem', padding: '0.2rem', marginTop: "1rem" }}>
                        0{cartItems.indexOf(item) + 1}
                      </span>
                    </div>
                    
                    {/* Product Image and Details */}
                    <div className="flex flex-col items-center md:items-start">
                      {/* Product Image */}
                      <img 
                        src={item.image || 'default_image_url'} 
                        alt={`Product ${item.name}`} 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '1rem' }} 
                      />

                      {/* Product Name and Price */}
                      <div className="text-center md:text-left">
                        <h3 className="font-semibold">{item.name || 'Unnamed Product'}</h3>
                        <p>${Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className='flex flex-row md:justify-start justify-end items-center' >
                        <button
                        onClick={()=>handleQuantity('decrement',item._id)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'
                         style={{ margin: '1rem',marginLeft:'0.2rem' }}>-</button>
                        <span className='text-center'>{item.quantity}</span>
                        <button onClick={()=>handleQuantity('increment',item._id)}
                         className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'
                         style={{ margin: '1rem' }}>+</button>
                        <button className='text-red-500 hover:text-red'
                        onClick={(e)=>handleRemove(e,item._id)}
                        >Remove</button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* calculation*/}
             {
            products.length > 0 && (
                <OrderSummery/>
            )
        }
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default CartModel;
