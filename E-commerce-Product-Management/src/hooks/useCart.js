
import { useContext } from 'react';
import { CartContexts } from '../context/CartContexts';






export const useCart = () => {
  const context = useContext(CartContexts);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};