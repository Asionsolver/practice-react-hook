export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
          const existingProduct = state.find(item => item.id === action.payload.id);
          if (existingProduct) {
            return state.map(item => 
              item.id === action.payload.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_FROM_CART':
          return state.filter(item => item.id !== action.payload);
        case 'UPDATE_QUANTITY':
          return state.map(item => 
            item.id === action.payload.id 
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
        default:
          return state;
      }
};