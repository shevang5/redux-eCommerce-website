import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Products = () => {
  const products = useSelector((state) => state.productsReducers.products)

  const renderProduct = products.map((product) => (
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden m-4 hover:shadow-lg transition duration-300"
    >
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.title}
      />

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">${product.price}</span>
          <button
            onClick={(e) => {
              e.preventDefault() // Prevent navigation on button click
              alert(`${product.title} added to cart`) // Replace with dispatch
            }}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  ))

  return products.length > 0 ? (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start p-4">
      {renderProduct}
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">Loading...</div>
  )
}

export default Products
