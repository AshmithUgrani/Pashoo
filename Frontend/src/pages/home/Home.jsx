import React from 'react'
import Banner from './banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blog from '../blogs/Blog'


const Home = () => {
  return (<>
    <Banner/>
    <Categories/>
    <HeroSection/>
    <TrendingProducts/>
    <DealsSection/>
    <PromoBanner/>
    <Blog/>
    </>
  )
}

export default Home