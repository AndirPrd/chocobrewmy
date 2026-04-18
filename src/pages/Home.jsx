import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, MapPin, Menu as MenuIcon, ScrollText } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cafeLayoutImg from '../assets/images/home/cafelayout.png'
import homeChocolateImg from '../assets/images/home/drink-groups/Chocolate.jpeg'
import homeCoffeeImg from '../assets/images/home/drink-groups/Coffee.jpeg'
import homeIceCreamImg from '../assets/images/home/drink-groups/Ice Cream.jpeg'
import logo from '../assets/images/logo/ChocoBrewmy_Logo.png'

const frameModules = import.meta.glob('../assets/images/home/herosequence/*.jpg', {
  eager: true,
  import: 'default',
})

const heroFrames = Object.entries(frameModules)
  .sort(([pathA], [pathB]) => {
    const numberA = Number(pathA.match(/(\d+)\.jpg$/)?.[1] ?? 0)
    const numberB = Number(pathB.match(/(\d+)\.jpg$/)?.[1] ?? 0)
    return numberA - numberB
  })
  .map(([, src]) => src)

const quickLinks = [
  {
    title: 'Menu',
    description: 'Explore hot and cold drinks, grouped by Chocolate, Coffee, and Ice Cream.',
    to: '/menu',
    icon: MenuIcon,
  },
  {
    title: 'Locations',
    description: 'Find Chocobrewmy spots in Jomokerto and choose your nearest cozy corner.',
    to: '/locations',
    icon: MapPin,
  },
  {
    title: 'About',
    description: 'Read our story, our craft values, and what makes Chocobrewmy feel warm.',
    to: '/about',
    icon: ScrollText,
  },
]

const featuredGroups = [
  {
    title: 'Chocolate',
    description: 'Comfort-forward cocoa drinks from silky hot chocolate to chilled dark swirls.',
    image: homeChocolateImg,
    to: '/menu',
  },
  {
    title: 'Coffee',
    description: 'Balanced brews with cozy aroma, crafted from espresso roots to creamy lattes.',
    image: homeCoffeeImg,
    to: '/menu',
  },
  {
    title: 'Ice Cream',
    description: 'Creamy dessert-forward sips and scoops with playful texture and smooth finish.',
    image: homeIceCreamImg,
    to: '/menu',
  },
]

const fullBleedSection =
  'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen rounded-none border-y border-choco-200 bg-cream-100 px-8 py-14 sm:px-10 sm:py-20'
const sectionViewport = { once: false, amount: 0.3 }

function Home() {
  const heroRef = useRef(null)
  const [activeFrame, setActiveFrame] = useState(0)
  const totalFrames = heroFrames.length
  const heroScrollHeight = useMemo(() => `calc(100vh + ${totalFrames * 24}px)`, [totalFrames])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameProgress = Math.min(latest, 1)
    const index = Math.min(Math.floor(frameProgress * (totalFrames - 1)), totalFrames - 1)
    setActiveFrame(index)
  })

  const currentFrame = useMemo(() => heroFrames[activeFrame] ?? heroFrames[0], [activeFrame])
  const chocoActive = activeFrame >= Math.floor(totalFrames * 0.12)
  const coffeeActive = activeFrame >= Math.floor(totalFrames * 0.5)
  const iceActive = activeFrame >= Math.floor(totalFrames * 0.70)

  return (
    <div className="space-y-12 pb-8">
      <section
        id="home-hero-sequence"
        ref={heroRef}
        style={{ height: heroScrollHeight }}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-28 w-screen"
      >
        <div className="sticky top-0 h-screen overflow-hidden border-y border-choco-200">
          <img src={currentFrame} alt="Chocobrewmy hero sequence" className="h-full w-full object-cover" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: coffeeActive ? 1 : 0, y: coffeeActive ? 0 : 24 }}
            transition={{ duration: 0.35 }}
            className="absolute left-[8%] top-[12%] z-30 rounded-full border-2 border-choco-300 bg-cream-50/95 px-6 py-3 text-xl font-semibold uppercase tracking-[0.14em] text-choco-900 shadow-cozy sm:text-3xl"
          >
            Coffee
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: chocoActive ? 1 : 0, y: chocoActive ? 0 : 24 }}
            transition={{ duration: 0.35 }}
            className="absolute right-[8%] top-[44%] z-30 rounded-full border-2 border-choco-300 bg-cream-50/95 px-6 py-3 text-xl font-semibold uppercase tracking-[0.14em] text-choco-900 shadow-cozy sm:text-3xl"
          >
            Chocolate
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: iceActive ? 1 : 0, y: iceActive ? 0 : 24 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-[12%] left-[8%] z-30 rounded-full border-2 border-choco-300 bg-cream-50/95 px-6 py-3 text-xl font-semibold uppercase tracking-[0.14em] text-choco-900 shadow-cozy sm:text-3xl"
          >
            Ice Cream
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        className={`${fullBleedSection} overflow-hidden`}
      >
        <img
          src={cafeLayoutImg}
          alt="Cafe interior layout"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/92 to-cream-100/78" />
        <div className="mx-auto grid min-h-[72vh] max-w-5xl items-center gap-10 md:grid-cols-[1.35fr_1fr]">
          <div className="relative z-10 text-left">
            <p className="text-xl font-semibold uppercase tracking-[0.24em] text-fresh-sage sm:text-2xl">
              Welcome
            </p>
            <h1 className="mt-6 text-4xl font-semibold text-choco-800 sm:text-6xl">What Is Chocobrewmy?</h1>
            <p className="mt-6 max-w-3xl text-justify text-base leading-relaxed text-choco-600 sm:text-lg">
              Chocobrewmy is a cozy fusion of rich chocolate comfort, balanced coffee brew, and
              creamy ice cream joy. We craft simple, warm, and satisfying drinks that make each
              visit feel like your favorite pause in the day.
            </p>
          </div>
          <div className="relative z-10 flex justify-center md:justify-end">
            <img src={logo} alt="Chocobrewmy logo" className="h-44 w-auto object-contain sm:h-56" />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.45 }}
        className={fullBleedSection}
      >
        <div className="mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center space-y-8">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.24em] text-fresh-sage sm:text-2xl">
              Featured
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-choco-800 sm:text-6xl">
              Our Beverage Groups
            </h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featuredGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="w-[340px] shrink-0 overflow-hidden rounded-none border border-choco-200 bg-cream-50 shadow-cozy"
              >
                <img src={group.image} alt={`${group.title} group`} className="h-52 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <h3 className="text-2xl font-semibold text-choco-800">{group.title}</h3>
                  <p className="text-base text-choco-600">{group.description}</p>
                  <Link
                    to={group.to}
                    className="inline-flex items-center gap-2 rounded-full bg-choco-700 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-choco-800"
                  >
                    Explore {group.title}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.45 }}
        className={fullBleedSection}
      >
        <div className="mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center space-y-8">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.24em] text-fresh-sage sm:text-2xl">
              Explore
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-choco-800 sm:text-6xl">Navigate This Page</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {quickLinks.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-none border border-choco-200 bg-cream-50 p-6 shadow-cozy"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-choco-800">{item.title}</h3>
                      <p className="mt-3 text-base text-choco-600">{item.description}</p>
                    </div>
                    <Icon className="mt-1 text-choco-700" size={22} />
                  </div>
                  <Link
                    to={item.to}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-choco-700 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-choco-800"
                  >
                    Open {item.title}
                    <ArrowRight size={16} />
                  </Link>
                </motion.article>
              )
            })}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
