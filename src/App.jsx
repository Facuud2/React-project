import Product from "./components/Product";

import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

function App() {


  const { data, cart, setCart, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, handleClearCart,         isOpen,
        dropdownRef,
        toggleCart,
        totalItems,
        isEmpty,
        total } = useCart();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleClearCart={handleClearCart}
        isOpen={isOpen}
        dropdownRef={dropdownRef}
        toggleCart={toggleCart}
        totalItems={totalItems}
        isEmpty={isEmpty}
        total={total}
      />
      {/* Espaciado para evitar solapamiento con el header */}
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Listado de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {data.map((product) => (
            <Product 
              key={product.id}
              product={product}
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
<footer className="bg-gray-800 text-white mt-16">
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h2 className="text-xl font-bold mb-3">Mi Tienda</h2>
      <p className="text-sm text-gray-300">
        Tu lugar para encontrar los mejores productos de moda, tecnología y más.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Enlaces rápidos</h3>
      <ul className="space-y-1 text-gray-300 text-sm">
        <li><a href="#" className="hover:underline">Inicio</a></li>
        <li><a href="#" className="hover:underline">Catálogo</a></li>
        <li><a href="#" className="hover:underline">Contacto</a></li>
        <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Seguinos</h3>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-blue-400">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 4.01a8.38 8.38 0 01-2.36.65A4.1 4.1 0 0021.4 2.2a8.2 8.2 0 01-2.6.98A4.1 4.1 0 0015.4 2a4.12 4.12 0 00-4.1 4.1c0 .32.04.64.1.94A11.65 11.65 0 013 3.15a4.08 4.08 0 00-.56 2.06c0 1.42.73 2.67 1.83 3.4a4.09 4.09 0 01-1.86-.5v.05c0 1.98 1.41 3.63 3.3 4a4.11 4.11 0 01-1.85.07c.52 1.63 2.04 2.81 3.83 2.85A8.23 8.23 0 012 19.54 11.62 11.62 0 008.29 21c7.55 0 11.68-6.26 11.68-11.7 0-.18-.01-.36-.02-.53A8.18 8.18 0 0022 4.01z" />
          </svg>
        </a>
        <a href="#" className="hover:text-pink-500">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.2c3.2 0 3.584.012 4.847.07 1.17.056 1.97.248 2.428.418a4.92 4.92 0 011.774 1.153 4.92 4.92 0 011.153 1.774c.17.458.362 1.258.418 2.428.058 1.263.07 1.647.07 4.847s-.012 3.584-.07 4.847c-.056 1.17-.248 1.97-.418 2.428a4.92 4.92 0 01-1.153 1.774 4.92 4.92 0 01-1.774 1.153c-.458.17-1.258.362-2.428.418-1.263.058-1.647.07-4.847.07s-3.584-.012-4.847-.07c-1.17-.056-1.97-.248-2.428-.418a4.92 4.92 0 01-1.774-1.153 4.92 4.92 0 01-1.153-1.774c-.17-.458-.362-1.258-.418-2.428C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.847c.056-1.17.248-1.97.418-2.428a4.92 4.92 0 011.153-1.774 4.92 4.92 0 011.774-1.153c.458-.17 1.258-.362 2.428-.418C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.155 0-3.522.012-4.767.068-1.018.048-1.567.216-1.932.362a3.12 3.12 0 00-1.12.73 3.12 3.12 0 00-.73 1.12c-.146.365-.314.914-.362 1.932C3.812 8.478 3.8 8.845 3.8 12c0 3.155.012 3.522.068 4.767.048 1.018.216 1.567.362 1.932a3.12 3.12 0 00.73 1.12 3.12 3.12 0 001.12.73c.365.146.914.314 1.932.362C8.478 20.188 8.845 20.2 12 20.2s3.522-.012 4.767-.068c1.018-.048 1.567-.216 1.932-.362a3.12 3.12 0 001.12-.73 3.12 3.12 0 00.73-1.12c.146-.365.314-.914.362-1.932.056-1.245.068-1.612.068-4.767s-.012-3.522-.068-4.767c-.048-1.018-.216-1.567-.362-1.932a3.12 3.12 0 00-.73-1.12 3.12 3.12 0 00-1.12-.73c-.365-.146-.914-.314-1.932-.362C15.522 4.012 15.155 4 12 4zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 1.8a3 3 0 100 6 3 3 0 000-6zm4.8-.9a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div className="bg-gray-900 text-center text-sm py-4 text-gray-400">
    © {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
  </div>
</footer>

    </div>
  );
}

export default App;