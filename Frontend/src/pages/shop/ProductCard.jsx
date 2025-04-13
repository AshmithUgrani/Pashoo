import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add product to cart
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="product__card">
          <div className="relative">
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>

            {/* Add to Cart Button */}
            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart(product); // Add product to cart
                }}
              >
                <i className="ri-shopping-cart-2-line bg-red-700 p-1.5 text-white hover:bg-red-800"></i>
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="product__card__content">
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-lg text-gray-700">
              ${product.price.toFixed(2)}
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
