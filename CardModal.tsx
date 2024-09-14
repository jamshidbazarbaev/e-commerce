import React from 'react';
import { IProduct } from '../models/models';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartModalProps {
  cart: CartItem[];
  showModal: boolean;
  toggleModal: () => void;
  handleDelete: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, showModal, toggleModal, handleDelete }) => {
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${showModal ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ width: '300px' }}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-4 flex items-center justify-between border-b pb-2">
              <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
              <div className="flex-1 mx-4">
                <h3>{item.title} <span className="text-sm text-gray-500">({item.quantity}x)</span></h3>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Checkout</h4>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Address"
               className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 mb-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Place Order
            </button>
          </form>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
