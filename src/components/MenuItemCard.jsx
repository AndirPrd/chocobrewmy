import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Sparkles, Minus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatIDR } from '../utils/currency'

function MenuItemCard({ item, addToCart }) {
  const [showModal, setShowModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleOpenModal = () => {
    setQuantity(1)
    setShowModal(true)
  }

  const handleConfirmAdd = () => {
    addToCart(item, quantity)
    setShowModal(false)
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="w-[280px] shrink-0 overflow-hidden rounded-none border border-choco-200 bg-cream-50 shadow-cozy"
      >
        <div className="relative h-48 overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-choco-800 px-3 py-1 text-xs font-semibold text-cream-50">
            {item.temp}
          </span>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fresh-sage">
              {item.group}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-choco-800">{item.name}</h3>
            <p className="mt-1 text-sm text-choco-600">{item.shortDesc}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-choco-800">{formatIDR(item.price)}</p>
            <div className="flex items-center gap-2">
              <Link
                to={`/drink/${item.group}`}
                className="inline-flex items-center gap-1 rounded-full border border-choco-300 px-3 py-1.5 text-xs font-semibold text-choco-700 transition hover:bg-choco-100"
              >
                <Sparkles size={14} />
                Detail
              </Link>
              <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center gap-1 rounded-full bg-choco-700 px-3 py-1.5 text-xs font-semibold text-cream-50 transition hover:bg-choco-800"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-choco-900/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative z-10 w-full max-w-sm rounded-3xl bg-cream-50 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative h-48 w-full">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-choco-900/50 text-cream-50 backdrop-blur-sm transition-colors hover:bg-choco-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-choco-800">{item.name}</h3>
                  <p className="text-sm font-semibold text-choco-600">{formatIDR(item.price)}</p>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-choco-300 text-choco-700 transition hover:bg-choco-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold text-choco-800 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-choco-300 text-choco-700 transition hover:bg-choco-100"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  onClick={handleConfirmAdd}
                  className="w-full rounded-2xl bg-choco-700 py-4 font-bold tracking-wide text-cream-50 transition-colors hover:bg-choco-800 flex items-center justify-center gap-2"
                >
                  <span>Add to Order</span>
                  <span>•</span>
                  <span>{formatIDR(item.price * quantity)}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MenuItemCard

