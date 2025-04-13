import React, { useState } from 'react'
import ProductCard from './ProductCard'
import products from "../../data/product.json"

const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts]=useState(8);
    const loadMoreProducts =()=>{
        setVisibleProducts(prevCount=> prevCount+4)     // when we click load more btn it will increase  //the size by 4.here visibleProduct is considerd has prevcount
    }
  return (
   <section className='section__container product__container'>
    <h2 className='section__header'>Trending Products</h2>
    <p className='section__subheader mb-12'>Discover The Hottest Picks:Elevate Your Style
     with Our Curated Collection Of trending Womens Fasion Products</p>

     {/* products Card */}
    
        <div className='mt-12'><ProductCard products={products.slice(0,visibleProducts)}/></div>
       
     
     {/* load more btn */}
     <div className='product__btn'>
        {
            visibleProducts < products.length&&(
                <button className='btn' onClick={loadMoreProducts}>Load More</button>
            )
        }
     </div>
   </section>
  )
}

export default TrendingProducts