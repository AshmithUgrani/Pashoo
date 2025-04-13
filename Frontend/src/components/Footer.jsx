import React from 'react'


const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
      <div className='footer__col'>
        <h4>CONTACT INFO</h4>
        <p>
          <span ><i className='ri-map-pin-2-fill'></i></span>
          123,Church Streeet ,Bengaluru
        </p>
        <p>
          <span><i className='ri-mail-fill'></i></span>
          support@shoporia.com
        </p>
        <p>
          <span className='ri-phone-fill'></span>
          +91 9874623570
        </p>
      </div>

      <div className='footer__col'>
        <h4>COMPANY</h4>
        <a href='/'>Home</a>
        <a href='/'>About US</a>
        <a href='/'>Work With Us</a>
        <a href='/'>Our Blogs</a>
        <a href='/'>Terms & Condition</a>
      </div>
      <div className='footer__col'>
        <h4>USEFULL  LINKS</h4>
        <a href='/'>Help</a>
        <a href='/'>Track Your Order</a>
        <a href='/'>Men</a>
        <a href='/'>Women</a>
        <a href='/'>Dresses</a>
      </div>

    </footer>
    <div className='footer__bar'>
      Copyrigth @ 2025 by Shoporia.All rights reserved.
    </div>
    </>
  )
}

export default Footer