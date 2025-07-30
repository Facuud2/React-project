import React from 'react'
import CartList from './CartList'

const Header = ({ cart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, handleClearCart }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Mi Tienda</h1>

      <CartList cart={cart}
       handleRemoveFromCart={handleRemoveFromCart} 
       handleIncreaseQuantity={handleIncreaseQuantity}
       handleDecreaseQuantity={handleDecreaseQuantity}
       handleClearCart={handleClearCart}
      />

    </div>
  </header>
  )
}

export default Header