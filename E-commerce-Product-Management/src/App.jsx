import Cart from "./components/Cart"
import { ProductManagement } from "./components/ProductManagement"
import { CartProvider } from "./context/CartContexts"
import { ProductProvider } from "./context/ProductContext"


function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="flex">
          <div className="w-2/3">
            <ProductManagement />
          </div>
          <div className="w-1/3">
            <Cart />
          </div>
        </div>
      </CartProvider>
    </ProductProvider>

  )
}

export default App
