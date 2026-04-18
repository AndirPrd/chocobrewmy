import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import MenuItemCard from './MenuItemCard'

function CategoryCarousel({ title, items, addToCart }) {
  const railRef = useRef(null)

  const scrollByAmount = (direction) => {
    if (!railRef.current) return
    railRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-choco-800">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount('left')}
            className="rounded-full border border-choco-300 bg-cream-50 p-2 text-choco-700 transition hover:bg-cream-100"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount('right')}
            className="rounded-full border border-choco-300 bg-cream-50 p-2 text-choco-700 transition hover:bg-cream-100"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <motion.div
          ref={railRef}
          drag="x"
          dragConstraints={{ left: -300, right: 0 }}
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-choco-300 bg-cream-50 p-6 text-center text-sm text-choco-600">
          No {title.toLowerCase()} items available for this temperature.
        </div>
      )}
    </section>
  )
}

export default CategoryCarousel

