/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialCartState = {
    items: [],
    total: 0
};

const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                total: state.total + action.payload.price
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                total: state.total - action.payload.price
            }
        default:
            return state;

    }
}

// Create the context
export const CartContext = createContext();

// Create the provider
export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    const addToCart = (item) => {
        dispatch({
            type: CART_ADD_ITEM,
            payload: item
        });
    };

    const removeFromCart = (item) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: item
        });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};





