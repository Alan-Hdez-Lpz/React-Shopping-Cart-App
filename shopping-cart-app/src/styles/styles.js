import styled from 'styled-components';
import { Link } from 'react-router';

/* Header */
export const HeaderWrapper = styled.header`
  background: #333;
  color: white;
  padding: 1rem;
`;

export const Nav = styled.nav`
  margin-top: 0.5rem;
  a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
  }
`;

/* Product Grid & Cards */
export const ProductGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const ProductCardWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;

  img {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
  }

  h3 {
    margin: 0.5rem 0;
  }
`;

/* Cart */
export const CartContainer = styled.div`
  padding: 1rem;
`;

export const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 1rem;
  align-items: center;

  img {
    width: 100px;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
  }

  input {
    width: 60px;
    margin-top: 0.5rem;
  }

  button {
    background: #c00;
    color: white;
    border: none;
    padding: 0.4rem;
    margin-top: 0.5rem;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    input {
      margin-top: 0;
    }
  }
`;

/* Checkout */
export const CheckoutForm = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 400px;

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

/* Typography */
export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Total = styled.h3`
  margin-top: 2rem;
`;

export const Message = styled.p`
  padding: 1rem;
  background: #eee;
  border-left: 4px solid #333;
  max-width: 600px;
  margin: 1rem 0;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 1rem;
  font-size: 1rem;
`;

export const Button = styled.button`
  background: #007bff;
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

/* Product Detail */
export const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.75rem;
    background: #333;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #111;
    }
  }
`;

export const BackButton = styled(Link)`
  align-self: flex-start;
  margin-bottom: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;