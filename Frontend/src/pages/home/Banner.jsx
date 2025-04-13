import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content'>
            <h4>UP TO 20% Discount on</h4>
            <h1>
                Girls Fashion's
            </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, nostrum quo adipisci tempora eos temporibus dignissimos labore modi numquam ipsum possimus quas veritatis fugit sit aperiam cum ducimus. Quam, laboriosam!</p>
            <button className='btn'><Link to='/shop'>Explore Now</Link></button>
        </div>
        <div className='header__image'>
            <img src= {bannerImg}  alt="banner image"/>
        </div>

    </div>
  );
}

export default Banner;
