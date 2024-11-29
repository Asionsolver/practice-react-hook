import { Trash2  } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export function CartButton() {
  const { cartState, removeFromCart, addToCart } = useCart();

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      <div className="space-y-2">
        {cartState.items.map(item => (
          <div 
            key={item.id} 
            className="flex justify-between items-center"
          >
            <span>{item.name}</span>
            <button 
              onClick={() => removeFromCart(item)}
              className="text-red-500"
            >
              <Trash2  size={16} />
            </button>
          </div>
        ))}
        <p>Total: ${cartState.total.toFixed(2)}</p>
        <button 
          onClick={() => addToCart({ 
            id: Date.now(), 
            name: 'Sample Product', 
            price: 19.99 
          })}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Sample Item
        </button>
      </div>
    </div>
  );
}