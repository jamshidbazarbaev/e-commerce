import React from 'react'
import { IProduct } from '../models/models'

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white " >
      <img 
        src={product.images[0]} 
        alt={product.title} 
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{product.title}</h2>
        <p className="text-gray-700 text-base mb-2">{product.description}</p>
        <p className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
} 

export default ProductCard