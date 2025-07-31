import { useState, useRef, useEffect, useMemo } from 'react';
import productos from "../data/db"; 

export function useCart() {

    const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) : [];
}

const [data, setData] = useState(productos);

const [cart, setCart] = useState(initialCart);

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

const handleAddToCart = (product) => {

  const itemExists = cart.findIndex((item) => item.id === product.id)
    if (itemExists !== -1) {
      const updatedCart = [...cart];

      updatedCart[itemExists].cantidad += 1;

      setCart(updatedCart);
      
    } else {
      product.cantidad = 1;
      setCart([...cart, product]);
    }
};

  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  };
  
  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.cantidad < MAX_QUANTITY) {
        return {
          ...item,
          cantidad: item.cantidad + 1
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.cantidad > MIN_QUANTITY) {
        return {
          ...item,
          cantidad: item.cantidad - 1
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  const handleClearCart = () => {
    setCart([]);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const totalItems = cart.reduce((total, item) => total + (item.cantidad), 0);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const total = useMemo(() => cart.reduce((total, item) => total + (item.precio * (item.cantidad)), 0), [cart]);


    return {
        data,
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleClearCart,
        isOpen,
        dropdownRef,
        toggleCart,
        totalItems,
        isEmpty,
        total
    }
}