/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/CartReducers";


export const CartContexts = createContext();

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContexts.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                cartTotal
            }}
        >
            {children}
        </CartContexts.Provider>
    );
};