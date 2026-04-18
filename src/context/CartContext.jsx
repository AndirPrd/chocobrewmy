import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const [recentAddition, setRecentAddition] = useState(null)

  const addToCart = (item, quantityToAdd = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem,
        )
      }
      return [...prev, { ...item, quantity: quantityToAdd }]
    })

    const toastId = Date.now()
    setRecentAddition({ item, quantity: quantityToAdd, id: toastId })
    setTimeout(() => {
      setRecentAddition((current) => current?.id === toastId ? null : current)
    }, 3000)
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      recentAddition,
    }),
    [cartItems, totalItems, totalPrice, recentAddition],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }

