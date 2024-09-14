import React, { useState } from 'react';
import { IProduct } from '../models/models';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartModal from './CardModal';

interface ProductsListProps {
  products: IProduct[];
}
interface CartItem extends IProduct {
  quantity: number;
}


const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleDelete = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <AiOutlineShoppingCart 
          size={30} 
          className="cursor-pointer" 
          onClick={toggleModal} 
        />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </div>

      <CartModal 
        cart={cart}
        showModal={showModal}
        toggleModal={toggleModal}
        handleDelete={handleDelete}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-md">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[192px] object-cover mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 float-right"
              onClick={() => handleAddToCart(product)} 
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
