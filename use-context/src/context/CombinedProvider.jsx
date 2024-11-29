/* eslint-disable react/prop-types */
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export function CombinedProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

