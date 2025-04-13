import React, { useEffect, useState } from 'react';
import productsdata from '../../data/product.json';
import ProductCard from './ProductCard';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    Categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    Color: ['all', 'black', 'red', 'blue', 'gold', 'silver', 'beige', 'green'],
    priceRange: [
        { label: 'under $50', min: 0, max: 50 },
        { label: 'under $50-$100', min: 50, max: 100 },
        { label: 'under $100-$200', min: 100, max: 200 },
        { label: 'under $200 and above', min: 200, max: Infinity },
    ],
};

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: '', // Start as an empty string
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(12);

    // Destructure filtersState as an object
    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    });

    // Clear the filter
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: '', // Reset to an empty string
        });
    };

    

    
    
    return (
        <>
            <section className="section__container bg-fuchsia-100">
                <h2 className="section__header capitalize">Shop page</h2>
                <p className="section__subheader">
                    Discover the Hottest Picks: Elevate Your Style with Our Curated Collection Of Trending Women's Fashion Products.
                </p>
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row mid:gap-12 gap-8">
                    {/* left side */}
                    <ShopFiltering
                        categories={filters.Categories} // Passing categories directly
                        colors={filters.Color} // Passing colors directly
                        priceRange={filters.priceRange} // Passing price range directly
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />
                    {/* right side */}
                    <div>
                        <h3 className="text-x1 font-medium " style={{ marginBottom: '24px' }}>Products Available:{products.length}</h3>
                        <ProductCard products={products} />


                       


                            
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;
