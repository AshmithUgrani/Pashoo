import React from 'react'

const PromoBanner = () => {
  return (
   <section className='section__container banner__container'>
    <div className='banner__card'>
        <span><i className="ri-truck-line"></i></span>
        <h4>Free Delivery</h4>
        <p>offers convenience and the ablity to shop from anywhere anytime.</p>
    </div>

    <div className='banner__card'>
        <span><i className="ri-money-dollar-circle-line"></i></span>
        <h4>100% Money Back Guaranty</h4>
        <p>E-commerce have a review system where customers can share feedback</p>
    </div>

    <div className='banner__card'>
        <span><i className="ri-user-voice-fill"></i></span>
        <h4>Support Strong</h4>
        <p>offers customer support service to assist customers with quires and issues.</p>
    </div>
   </section>
  )
}

export default PromoBanner