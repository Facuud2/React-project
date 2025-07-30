import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CartButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #357abd;
  }
`;

const CartIcon = styled.span`
  font-size: 1.2rem;
`;

const CartCount = styled.span`
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  z-index: 1000;
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.2s ease-in-out;
`;

const CartItems = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const CartItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9f9f9;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  padding: 0;
  line-height: 1;

  ${CartItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ff7875;
    transform: scale(1.1);
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
  color: #2c3e50;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const TotalSection = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 12px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
  
  &:last-child {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 1.1rem;
    color: #2c3e50;
  }
`;

const ClearCartButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  
  &:hover {
    background-color: #ff7875;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: default;
  padding: 0;
  color: #333;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const QuantityDisplay = styled.span`
  min-width: 20px;
  text-align: center;
  font-size: 0.9rem;
`;

const EmptyCart = styled.div`
  padding: 24px;
  text-align: center;
  color: #999;
`;

const CartList = ({ cart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, handleClearCart }) => {
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

  return (
    <CartContainer ref={dropdownRef}>
      <CartButton onClick={toggleCart}>
        <CartIcon>🛒</CartIcon>
        {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
      </CartButton>
      
      <Dropdown $isOpen={isOpen}>
        {isEmpty ? (
          <EmptyCart>Tu carrito está vacío</EmptyCart>
        ) : (
          <>
            <CartItems>
              {cart.map((item) => (
                <CartItem key={item.id}>
                  <DeleteButton 
                    onClick={() => handleRemoveFromCart(item.id)}
                    title="Eliminar del carrito">
                    ×
                  </DeleteButton>
                  <ItemDetails>
                    <ItemImage 
                      src={item.imagen} 
                      alt={item.nombre}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/60';
                      }}
                    />
                    <ItemInfo>
                      <ItemName title={item.nombre}>{item.nombre}</ItemName>
                      <ItemPrice>${item.precio}</ItemPrice>
                    </ItemInfo>
                  </ItemDetails>
                  <QuantityControls>
                    <QuantityButton 
                    onClick={() => handleDecreaseQuantity(item.id)}>-</QuantityButton>
                    <QuantityDisplay>{item.cantidad || 1}</QuantityDisplay>
                    <QuantityButton 
                    onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </QuantityButton>
                  </QuantityControls>
                </CartItem>
              ))}
            </CartItems>
            <TotalSection>
              <TotalRow>
                <span>Subtotal</span>
                <span>${total}</span>
              </TotalRow>
              <TotalRow>
                <span>Envío</span>
                <span>Gratis</span>
              </TotalRow>
              <TotalRow>
                <span>Total a pagar</span>
                <span>${total}</span>
              </TotalRow>
            </TotalSection>
            <ClearCartButton
            onClick={handleClearCart}
            >
              Vaciar carrito
            </ClearCartButton>
          </>
        )}
      </Dropdown>
    </CartContainer>
  );
};

export default CartList;