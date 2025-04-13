import React, { useState } from 'react';
import productsData from '../../data/product.json';
import ProductCards from '../shop/ProductCard'; // Assuming the correct import for ProductCards

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className="section__container bg-amber-50">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories from chic dresses to versatile accessories. Elevate your style today.
        </p>
      </section>
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
          style={{ padding:'7px',
            marginBottom:'30px'
          }}
            type="text"
            placeholder="Search for Products...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
            className="search-bar w-full max-w-4xl p-3 border rounded text-lg mb-4" // Added margin bottom to input
          />
          <button
          style={{ marginBottom: '30px',
                padding:'7px'}}
            onClick={handleSearch}
            className="search-button w-full md:w-auto  bg-red-700 text-white rounded text-xl font-semibold mb-4"  
          >
            Search
          </button>
        </div>
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
