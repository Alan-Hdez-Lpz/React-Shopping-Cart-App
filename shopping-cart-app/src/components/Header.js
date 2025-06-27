import React from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { HeaderWrapper, Nav } from '../styles/styles';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HeaderWrapper>
      <h1>ShopNow</h1>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/checkout">Checkout</Link>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
