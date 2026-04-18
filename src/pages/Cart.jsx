import { useCart } from '../context/CartContext'
import { formatIDR } from '../utils/currency'
import { motion, AnimatePresence } from 'framer-motion'
import { Receipt, X, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

function Cart() {
  const { cartItems, totalItems, totalPrice, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart()
  const [showReceipt, setShowReceipt] = useState(false)

  const handleCompleteOrder = () => {
    setShowReceipt(false)
    clearCart()
  }

  return (
    <section className="rounded-cozy bg-cream-100 p-8 shadow-cozy">
      <h1 className="text-3xl font-semibold text-choco-800">Your Cart</h1>
      <p className="mt-3 text-choco-600">
        Total items: <span className="font-semibold">{totalItems}</span>
      </p>
      <p className="text-choco-600">
        Total price: <span className="font-semibold">{formatIDR(totalPrice)}</span>
      </p>

      {cartItems.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-choco-300 bg-cream-50 p-6 text-choco-600">
          Your cart is empty. Add drinks from the menu to start your order.
        </div>
      ) : (
        <ul className="mt-5 space-y-3 text-left">
          {cartItems.map((item) => (
            <li key={item.id} className="rounded-2xl border border-choco-200 bg-cream-50 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 min-w-16 rounded-xl object-cover border border-choco-100" />
                <div className="flex-1">
                  <p className="font-bold text-choco-800">{item.name}</p>
                  <p className="text-sm text-choco-600 font-medium">
                    {item.quantity} x {formatIDR(item.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-full border border-choco-300 px-3 py-1 text-xs font-semibold text-choco-700 hover:bg-choco-100"
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id)}
                  className="h-8 w-8 rounded-full border border-choco-300 text-choco-700 hover:bg-choco-100"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-semibold text-choco-800">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(item)}
                  className="h-8 w-8 rounded-full border border-choco-300 text-choco-700 hover:bg-choco-100"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={clearCart}
          className="rounded-full border border-choco-300 bg-cream-50 px-5 py-2 text-sm font-semibold text-choco-700 hover:bg-choco-100"
        >
          Clear Cart
        </button>
        <button
          type="button"
          onClick={() => setShowReceipt(true)}
          className="rounded-full bg-choco-700 px-6 py-2.5 text-sm font-bold text-cream-50 hover:bg-choco-800 flex items-center gap-2"
        >
          <Receipt size={16} /> Checkout
        </button>
      </div>

      {/* Checkout Receipt Overlay */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-choco-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-[2rem] bg-cream-50 p-8 shadow-2xl text-center"
            >
              <button
                onClick={handleCompleteOrder}
                className="absolute top-4 right-4 text-choco-400 hover:text-choco-800 transition"
              >
                <X size={24} />
              </button>
              
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-fresh-sage/20 text-fresh-sage mb-6">
                <CheckCircle2 size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-choco-800">Order Confirmed!</h2>
              <p className="mt-2 text-sm text-choco-600">
                Your digital order receipt is ready. Take this to the cashier to process your items quickly.
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-choco-300 bg-cream-100 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9A8A78] mb-1">Order #CB-8492</p>
                <p className="text-3xl font-black text-choco-800 tracking-tight">{formatIDR(totalPrice)}</p>
                <p className="mt-2 text-sm font-semibold text-choco-600">{totalItems} Items Total</p>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="mt-8 w-full rounded-2xl bg-choco-800 py-3 font-bold tracking-wide text-cream-50 transition hover:bg-choco-900"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Cart

