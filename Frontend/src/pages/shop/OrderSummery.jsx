import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';

const OrderSummery = () => {

    const dispatch=useDispatch();
    const products=useSelector((store)=>store.cart.products);
    const{tax,taxRate,totalPrice,grandTotal,totalItems}=useSelector((store)=>store.cart);
    const handleClearCart=()=>{
        dispatch(clearCart());
    }

  return (
    <div className='bg-pink-100 rounded text-base'style={{marginTop:'0.25rem'}}>
        <div className='space-y-5 'style={{padding:'1rem', margin:'1rem'}}>
            <h2 className='text-2xl font-bold text-black'>Order Summary</h2>
            <p style={{paddingTop:"1rem"}} className=' text-black'>Selected Items :  {totalItems}</p>
            <p style={{paddingTop:"1rem"}}>Total Price :  ${totalPrice.toFixed(2)}</p>
            <p style={{paddingTop:"1rem"}}>Tax:  ({taxRate*100}%) : ${tax.toFixed(2)}</p>
            <h3 style={{paddingTop:"1rem"}} className='font-bold'>Grand Total :   ${grandTotal.toFixed(2)}</h3>
            <div style={{marginBottom:'0.5rem', padding:'0.25rem'}}>
                <button className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center'
                style={{margin:'2rem', padding:'0.5rem'}}><span style={{marginRight:"0.5rem"}}
                 onClick={(e)=>{
                    e.stopPropagation();
                    handleClearCart();
                 }}>Clear cart
                    </span><i className='ri-delete-bin-7-fill'></i></button>
                <button  className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center'
                style={{marginBottom:'0.5rem', padding:'0.5rem'}}><span style={{marginRight:"0.5rem"}}>Proceed Checkout
                    </span> <i className='ri-bank-card-line'></i></button>
            </div>
        </div>
    </div>
  )
}

export default OrderSummery