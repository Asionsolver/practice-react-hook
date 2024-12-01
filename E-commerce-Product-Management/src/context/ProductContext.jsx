/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import { createContext } from "react";
import { ProductReducer } from "../reducers/ProductReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, dispatch] = useReducer(ProductReducer, []);
    const [filter, setFilter] = useState('all');


    const addProduct = (product) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: product
        });
    }

    const updateProduct = (id, updates) => {
        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: { id, updates }
        });
    }

    const deleteProduct = (id) => {
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: id
        });
    }

    const filterProducts = products.filter(product => {
        if (filter === 'all') return true;
        return product.category === filter;

    });

    return (
        <ProductContext.Provider value={{
            products: filterProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            filter,
        }}>
            {children}
        </ProductContext.Provider>
    );
}