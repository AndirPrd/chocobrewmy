import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import menuFirstHeroImg from '../assets/images/big-herosection/Menu-1stHero.png'
import chocolateSectionImg from '../assets/images/drink-section/Chocolate.jpeg'
import coffeeSectionImg from '../assets/images/drink-section/Coffee.jpeg'
import iceCreamSectionImg from '../assets/images/drink-section/Ice Cream.jpeg'
import CategoryCarousel from '../components/CategoryCarousel'
import { useCart } from '../context/CartContext'
import menuData from '../data/menu'

const categories = ['Chocolate', 'Coffee', 'Ice Cream']
const sectionHeroes = [
  {
    title: 'Chocolate',
    image: chocolateSectionImg,
    promo:
      'Wrapped in rich cocoa warmth, our chocolate creations are made for comfort-first moments.',
  },
  {
    title: 'Coffee',
    image: coffeeSectionImg,
    promo:
      'From silky latte layers to bold espresso depth, each cup is brewed to keep your day glowing.',
  },
  {
    title: 'Ice Cream',
    image: iceCreamSectionImg,
    promo:
      'Creamy, playful, and irresistibly smooth, our ice cream line brings chill sweetness to every sip.',
  },
]

function Menu() {
  const [tempFilter, setTempFilter] = useState(null)
  const { addToCart } = useCart()

  const filteredByTemp = useMemo(
    () => (tempFilter ? menuData.filter((item) => item.temp === tempFilter) : menuData),
    [tempFilter],
  )

  const handleTempToggle = (temp) => {
    setTempFilter((current) => (current === temp ? null : temp))
  }

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-28 w-screen"
      >
        <div className="w-full overflow-hidden rounded-none border-y border-choco-200">
          <img
            src={menuFirstHeroImg}
            alt="Chocobrewmy menu hero"
            className="h-[340px] w-full object-cover sm:h-[720px]"
          />
        </div>
      </motion.section>

      <section className="-mx-4 space-y-4 sm:-mx-6">
        <div className="px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fresh-sage">
            Signature Sections
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-choco-800 sm:text-4xl">
            Pick Your Cozy Craving
          </h1>
        </div>

        <div className="space-y-5">
          {sectionHeroes.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full overflow-hidden rounded-none border-y border-choco-200 bg-cream-50 shadow-cozy"
            >
              <div
                className={`grid min-h-[340px] items-stretch lg:grid-cols-2 ${index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
                  }`}
              >
                <div className="flex flex-col justify-center space-y-4 p-7 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fresh-sage">
                    Chocobrewmy Collection
                  </p>
                  <h2 className="text-3xl font-semibold text-choco-800 sm:text-4xl">
                    {section.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-choco-600 sm:text-base">
                    {section.promo}
                  </p>
                </div>
                <div className="h-full min-h-[240px] overflow-hidden">
                  <img
                    src={section.image}
                    alt={`${section.title} section`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="-mx-4 overflow-hidden rounded-none border-y border-choco-200 bg-gradient-to-r from-cream-100 via-cream-50 to-fresh-peach/30 p-8 shadow-cozy sm:-mx-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fresh-sage">Menu</p>
        <h1 className="mt-2 text-3xl font-semibold text-choco-800 sm:text-4xl">Sip Catalog</h1>
        <p className="mt-3 max-w-2xl text-choco-600">
          Explore all Chocobrewmy drinks. Pick your preferred temperature, then swipe each
          category carousel to browse.
        </p>

        <div className="mt-5 inline-flex rounded-full border border-choco-300 bg-cream-50 p-1">
          {['Hot', 'Cold'].map((temp) => (
            <button
              key={temp}
              type="button"
              onClick={() => handleTempToggle(temp)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tempFilter === temp
                  ? 'bg-choco-700 text-cream-50'
                  : 'text-choco-700 hover:bg-choco-100'
                }`}
            >
              {temp}
            </button>
          ))}
        </div>
      </motion.section>

      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          <CategoryCarousel
            title={category}
            items={filteredByTemp.filter((item) => item.category === category)}
            addToCart={addToCart}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Menu
