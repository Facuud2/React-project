import React, { useState } from 'react'

const AddToCartButton = ( { id, handleAddToCart } ) => {

  return (
    <button 
    className="bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition text-white cursor-pointer"
    onClick={() => handleAddToCart(id)}
    >
    Agregar al carrito
  </button>
  )
}

export default AddToCartButton