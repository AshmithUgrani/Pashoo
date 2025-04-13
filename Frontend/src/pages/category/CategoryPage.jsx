import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from "../../data/product.json";
import ProductCard from '../shop/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Access the 'categoryName' parameter from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className='section__container bg-amber-50'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>
          Browse a diverse range of categories from chic dresses to versatile accessories. Elevate your style today.
        </p>
      </section>
      
      {/* Product Cards */}
      <div className='section__container'>
        <ProductCard products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
