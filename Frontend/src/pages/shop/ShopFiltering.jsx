import React from 'react';

const ShopFiltering = ({ categories, colors, priceRange, filtersState, setFiltersState, clearFilters }) => {
    return (
        <div className="space-y-6 flex-shrink-0"> {/* Increased space-y-6 for more vertical spacing */}
            <h3>Filters</h3>
             {/* categories */}
            <div className="flex flex-col space-y-2" style={{ marginBottom: '24px' }}> {/* Explicit margin */}
                <h4 className="font-medium text-lg">Category</h4>
                <hr />

                {/* Map over the categories */}
                {categories.map((category) => (
                    <label key={category} className="capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            id={category}
                            value={category}
                            checked={filtersState.category === category}
                            onChange={(e) =>
                                setFiltersState({ ...filtersState, category: e.target.value })
                            }
                        />
                        <span className="ml-1">{category}</span>
                    </label>
                ))}
            </div>

           {/*colors  */}
            <div className="flex flex-col space-y-2" style={{ marginBottom: '24px' }}> {/* Explicit margin */}
                <h4 className="font-medium text-lg">Color</h4>
                <hr />

                {/* Map over the colors */}
                {colors.map((color) => (
                    <label key={color} className="capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="color"
                            id={color}
                            value={color}
                            checked={filtersState.color === color}
                            onChange={(e) =>
                                setFiltersState({ ...filtersState, color: e.target.value })
                            }
                        />
                        <span className="ml-1">{color}</span>
                    </label>
                ))}
            </div>

            {/*  price range  */}

            <div className="flex flex-col space-y-2" style={{ marginBottom: '24px' }}> {/* Explicit margin */}
                <h4 className="font-medium text-lg">Price Range</h4>
                <hr />

                {/* Map over price range */}
                {priceRange.map((range) => (
                    <label key={range.label} className="capitalize cursor-pointer">
                        <input
                            type="radio"
                            name="priceRange"
                            value={range.label} // Set the label as the value of the radio
                            checked={filtersState.priceRange === range} // Compare the entire object
                            onChange={(e) =>
                                setFiltersState({ ...filtersState, priceRange: range })
                            }
                        />
                        <span className="ml-1">{range.label}</span>
                    </label>
                ))}
            </div>

            {/* clear filters */}
            <button  onClick={clearFilters}className='bg-red-700  text-white' style={{ padding: '7px' }}>Clear All Filters</button>
        </div>
    );
};

export default ShopFiltering;
