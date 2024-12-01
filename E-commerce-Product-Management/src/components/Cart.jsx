import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";


const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const formatDateTime = (createdAt) => {
        const formatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true // 12-hour format
        };

        const created = new Date(createdAt).toLocaleString(undefined, formatOptions);
        // console.log(created);

        // if (lastEditedAt) {
        //     const edited = new Date(lastEditedAt).toLocaleString(undefined, formatOptions);
        //     return `Created: ${created} | Edited: ${edited}`;
        // }

        return created;
    };
    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            </div>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
                <>

                    {cart.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center"
                        >
                            <div className="flex-grow">
                                <p className=" absolute right-8 top-20 text-xs mt-1" >{formatDateTime(item.createdAt)}</p>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>Price: ${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="text-gray-500"
                                >
                                    <MinusCircle />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-gray-500"
                                >
                                    <PlusCircle />
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 ml-4"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                        <h3 className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</h3>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart