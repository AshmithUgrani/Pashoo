import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
  const {data,error,isLoading}=useFetchProductByIdQuery(id);
  
  const singleProduct=data ?.product || {};
  
  const productReviews=data?.reviews ||[];

  if(isLoading) return <p>Loading....</p>
  if(error) return <p>Error loading product details.</p>

  return (
    <>
      <section className="section__container bg-fuchsia-100">
        <h2 className="section__header capitalize">SingleProduct page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-red-700">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-red-700">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-red-700">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container " style={{marginTop:'8px'}}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img
              src="https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* product content */}
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold " style={{marginBottom:'4px'}}>Product Name</h3>
            <p className="text-xl text-rose-500 "style={{marginBottom:'4px'}}>

              $100 <s> $130</s>
            </p>
            <p className="text-gray-400"style={{marginBottom:'10px'}}>This is product Description</p>

            {/* additional product */}
            <div>
              <p>
                <strong>Category:</strong> accessories
              </p>
              <p>
                <strong>Color:</strong> beige
              </p>
              <div className="flex gap-1 items-center">
                <strong className='flex gap-1 items-center'>Rating:</strong>
                <RatingStars rating={"4"} />
              </div>
            </div>
            <button className='bg-red-700  text-white' style={{ padding: '7px',marginTop:'10px' }}>
                Add to cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}

      <section className='section__container' style={{marginTop:'8px'}}>
        Reviews Here
      </section>
    </>
  );
};

export default SingleProduct;
