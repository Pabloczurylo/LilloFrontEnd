import { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * CartContext – Estado global del carrito de pedido para clientes.
 *
 * Provee:
 *  - cartItems            : [{ product, quantity }]
 *  - addItem(product)     : agrega 1 unidad (o crea entrada nueva)
 *  - removeItem(id)       : elimina el ítem del carrito
 *  - updateQty(id, delta) : incrementa o decrementa la cantidad (min 1)
 *  - setQty(id, qty)      : setea la cantidad exacta
 *  - clearCart()          : vacía el carrito
 *  - totalItems           : suma total de unidades
 *  - totalPrice           : suma total de precio × cantidad
 *  - getQty(id)           : cantidad actual de un producto
 */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const setQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity: qty } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getQty = useCallback(
    (productId) =>
      cartItems.find((i) => i.product.id === productId)?.quantity ?? 0,
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQty,
        setQty,
        clearCart,
        getQty,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/** Hook de acceso rápido */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}

export default CartContext;
