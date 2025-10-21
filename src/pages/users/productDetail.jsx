import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { asyncRemoveProduct, asyncUpdateProduct } from '../../store/action/productActions';
import { useState } from 'react';
// import { removeProduct } from '../redux/actions/productActions'; // Adjust path based on your project

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: { errors }} = useForm();
  const { productsReducers: { products }, usersReducer: { users }} = useSelector((state) => state);
  const product = products.find((product) => product.id === id);
  console.log(product, users);
  
  const user = users && users.length > 0 ? users[0] : null;
  const [showEditForm, setShowEditForm] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Dispatch your add-to-cart action here
    alert(`${product.title} added to cart!`);
  };

  const handleRemoveProduct = () => {
    const confirm = window.confirm("Are you sure you want to remove this product?");
    if (confirm) {
      dispatch(asyncRemoveProduct(product.id)); // Ensure action exists
      navigate(-1);
    }
  };

  const handleEditProduct = (product) => {
    console.log(product);
    dispatch(asyncUpdateProduct(id, product));
  };

  return (
    <div className="max-w-6xl md:mt-0 mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left - Product Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-3xl shadow-xl border-4 border-pink-200"
          />
        </div>

        {/* Right - Product Details */}
        <div className="space-y-6 p-8 rounded-3xl bg-white shadow-md">
          <h2 className="text-4xl font-extrabold text-pink-700">{product.title}</h2>
          <p className="text-xl text-gray-500 capitalize">{product.category}</p>
          <p className="text-2xl text-yellow-600 font-semibold">${product.price}</p>
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md">
              🛒 Add to Cart
            </button>
            <button className="bg-red-200 hover:bg-red-300 text-red-700 font-semibold py-2 px-5 rounded-full transition duration-300">
              ❤️ Like
            </button>
            {user?.isAdmin && (
  <button
    onClick={() => setShowEditForm((prev) => !prev)}
    className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-semibold py-2 px-5 rounded-full transition duration-300"
  >
    ✏️ Edit
  </button>
)}

            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-full transition duration-300">
              🔙 Back
            </button>
          </div>

          {/* Edit Form (UI only, hidden by default) */}
          {user?.isAdmin && showEditForm && (
            <div className="mt-10 p-6 bg-gray-100 rounded-2xl shadow-md space-y-4 w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h3>
            <form onSubmit={handleSubmit(handleEditProduct)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={product.title}
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  defaultValue={product.price}
                  {...register('price', { required: 'Price is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  defaultValue={product.description}
                  {...register('description', { required: 'Description is required' })}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  defaultValue={product.image}
                  {...register('image', { required: 'Image URL is required' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transition duration-300"
                >
                  💾 Save
                </button>
                <button
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full transition duration-300"
                  onClick={handleSubmit(handleRemoveProduct)}
                >
                  🗑️ Remove
                </button>
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
