import { Edit, PlusCircle, Save, ShoppingCart, Trash2 } from "lucide-react"
import { useProduct } from './../hooks/useProduct';
import { useState } from "react";
import { useCart } from "../hooks/useCart";


export const ProductManagement = () => {
    const { products, addProduct, updateProduct, deleteProduct, filter, setFilter } = useProduct();
    const { addToCart } = useCart();
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct(editingProduct.id, newProduct);
            setEditingProduct(null);
        } else {
            addProduct(newProduct);
        }
        setNewProduct({ name: '', price: '', category: '', stock: '' });
    };

    const formatDateTime = (createdAt, lastEditedAt) => {
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
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Product Management</h2>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="border p-2 rounded"
                            required
                        />
                        <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="border p-2 rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
                    >
                        {editingProduct ? <Save className="mr-2" /> : <PlusCircle className="mr-2" />}
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </form>

                <div className="flex space-x-2 mb-4">
                    {['all', 'electronics', 'clothing', 'books'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-3 py-1 rounded ${filter === category
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 border'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div
                            key={product.id || index}
                            className="bg-white p-4 rounded-lg shadow-md relative"
                        >
                            <h3 className="text-lg font-semibold">{product.name}</h3>

                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Stock: {product.stock}</p>
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={() => {
                                        setEditingProduct(product);
                                        setNewProduct(product);
                                    }}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    <Edit />
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <Trash2 />
                                </button>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="text-green-500 hover:text-green-600 ml-auto"
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingCart />
                                    <p className="absolute bottom-0 right-0 text-xs text-gray-400 p-2 mb-2 rounded">
                                        {formatDateTime(product.createdAt)}
                                    </p>
                                </button>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

