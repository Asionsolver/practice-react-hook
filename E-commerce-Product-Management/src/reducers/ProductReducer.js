export const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                {
                    id: Date.now(),
                    name: action.payload.name,
                    price: action.payload.price,
                    category: action.payload.category,
                    stock: action.payload.stock,
                    createdAt: new Date(),

                }
            ];
        case 'UPDATE_PRODUCT':
            return state.map((product) => {
                if (product.id === action.payload.id) {
                    return {
                        ...product,
                        ...action.payload.updates
                    };
                }
                return product;
            }
            );
        case 'DELETE_PRODUCT':
            return state.filter(product => product.id !== action.payload);
        default:
            return state;
    }
}