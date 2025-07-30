import React from 'react'
  
const Product = ( { product, handleAddToCart } ) => {

  const { nombre, precio, imagen } = product

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={imagen}
              alt={nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{nombre}</h2>
            <p className="text-gray-600 mb-2">${precio}</p>
            <button 
              className="bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition text-white cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </button>
            </div>
          </div>
  )
}

export default Product