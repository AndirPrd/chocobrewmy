import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import IngredientPointer from '../components/IngredientPointer'
import { useCart } from '../context/CartContext'
import menuData from '../data/menu'
import { formatIDR } from '../utils/currency'

function DrinkDetail() {
  const { group } = useParams()
  const { addToCart } = useCart()

  const groupItems = useMemo(() => menuData.filter((item) => item.group === group), [group])
  const [selectedId, setSelectedId] = useState(groupItems[0]?.id ?? null)
  
  const [showModal, setShowModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleOpenModal = () => {
    setQuantity(1)
    setShowModal(true)
  }

  const handleConfirmAdd = () => {
    addToCart(activeItem, quantity)
    setShowModal(false)
  }

  useEffect(() => {
    setSelectedId(groupItems[0]?.id ?? null)
  }, [groupItems])

  const activeItem = groupItems.find((item) => item.id === selectedId) ?? groupItems[0]

  if (!activeItem) {
    return (
      <section className="rounded-cozy bg-cream-100 p-8 shadow-cozy">
        <h1 className="text-3xl font-semibold text-choco-800">Drink Not Found</h1>
        <p className="mt-3 text-choco-600">
          No drink group matches <span className="font-semibold">{group}</span>.
        </p>
        <Link
          to="/menu"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-choco-700 px-5 py-2 text-sm font-semibold text-cream-50"
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 rounded-full border border-choco-300 bg-cream-50 px-4 py-2 text-sm font-semibold text-choco-700 hover:bg-choco-100"
      >
        <ArrowLeft size={16} />
        Back to Menu
      </Link>

      <section className="grid gap-6 rounded-[28px] border border-choco-200 bg-cream-100 p-6 shadow-cozy lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[420px] overflow-hidden rounded-[22px] border border-choco-200 bg-cream-50"
        >
          <img src={activeItem.image} alt={activeItem.name} className="h-full w-full object-cover" />
          {activeItem.ingredients.map((ingredient) => (
            <IngredientPointer
              key={ingredient.id}
              x={ingredient.x}
              y={ingredient.y}
              text={ingredient.text}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="space-y-5"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fresh-sage">
              {activeItem.group} Group
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-choco-800">{activeItem.name}</h1>
            <p className="mt-3 text-choco-600">{activeItem.shortDesc}</p>
            <p className="mt-4 text-xl font-semibold text-choco-800">
              {formatIDR(activeItem.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="rounded-full bg-choco-700 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-choco-800"
          >
            Add To Cart
          </button>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-choco-700">
              Variants In This Group
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {groupItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    item.id === activeItem.id
                      ? 'border-choco-500 bg-choco-100'
                      : 'border-choco-200 bg-cream-50 hover:bg-cream-100'
                  }`}
                >
                  <p className="text-sm font-semibold text-choco-800">{item.name}</p>
                  <p className="text-xs text-choco-600">
                    {item.temp} - {formatIDR(item.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Add to Cart Overlay */}
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
                <img src={activeItem.image} alt={activeItem.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-choco-900/50 text-cream-50 backdrop-blur-sm transition-colors hover:bg-choco-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-choco-800">{activeItem.name}</h3>
                  <p className="text-sm font-semibold text-choco-600">{formatIDR(activeItem.price)}</p>
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
                  <span>{formatIDR(activeItem.price * quantity)}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DrinkDetail
