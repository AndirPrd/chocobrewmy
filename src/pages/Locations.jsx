import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import jomokertoMapImg from '../assets/images/locations/Jomokertomap.png'
import locations from '../data/locations'

function Locations() {
  const heroRef = useRef(null)
  const [activePin, setActivePin] = useState(-1)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Track progress and reveal pins successively based on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.2) setActivePin(-1)
    else if (latest < 0.45) setActivePin(0)
    else if (latest < 0.7) setActivePin(1)
    else setActivePin(2)
  })

  // Subtle map parallax/pan effect
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const mapY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <div className="pb-24">
      {/* Scroll Hero Sequence for the Map */}
      <section
        id="locations-hero-sequence"
        ref={heroRef}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-28 w-screen"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden border-y border-choco-200 bg-[#fbf5ee]">
          <motion.div
            className="absolute inset-0"
            style={{ scale: mapScale, y: mapY }}
          >
            <img
              src={jomokertoMapImg}
              alt="Jomokerto map"
              className="h-full w-full object-cover opacity-80"
            />

            {/* The Pins - inside the scaled container so they do not drift */}
            {locations.map((location, index) => {
              const isActive = activePin >= index
              return (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.5,
                    y: isActive ? 0 : 50
                  }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
                  className="absolute z-20 pointer-events-auto"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    x: '-50%',
                    y: '-100%',
                  }}
                >
                  <div className="mb-2 whitespace-nowrap rounded-xl border-2 border-[#8C6B55] bg-[#fbf5ee]/95 px-4 py-2 font-bold text-[#4A3B32] shadow-xl text-sm md:text-base transition-transform hover:scale-105 cursor-pointer">
                    {location.name}
                  </div>
                  <div className="flex justify-center text-[#5C4535]">
                    <MapPin size={40} className="drop-shadow-lg" fill="#fbf5ee" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Map Overlay Text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5ee]/70 via-transparent to-[#fbf5ee]/30 pointer-events-none" />
          <motion.div
            className="absolute top-[16%] left-1/2 -translate-x-1/2 text-center pointer-events-none drop-shadow-md z-10"
          >
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl text-[#4A3B32] [-webkit-text-stroke:2px_#fbf5ee] drop-shadow-2xl">
              Our Locations
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-black tracking-wide text-[#5C4535] [-webkit-text-stroke:1px_#fbf5ee] [text-shadow:0_4px_16px_rgba(251,245,238,0.8)]">
              Scroll down to explore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expanded Information Cards */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9A8A78]">
            Branches
          </p>
          <h2 className="mt-3 text-4xl font-bold text-[#4A3B32] md:text-5xl">Find Your Cozy Corner</h2>
          <p className="mt-5 text-lg text-[#6B5A4B] max-w-2xl mx-auto">Every branch is a distinct experience, yet shares our signature comfort. Explore our locations below.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <motion.article
              key={location.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E5D7C5] bg-[#fbf5ee] shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-56 w-full overflow-hidden border-b border-[#E5D7C5]">
                <img
                  src={location.image}
                  alt={location.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1 bg-white">
                <h3 className="text-2xl font-bold text-[#4A3B32]">{location.name}</h3>
                <p className="mt-2 text-xs font-bold text-[#9A8A78] uppercase tracking-wider">Map Point: {location.x}°, {location.y}°</p>

                <p className="mt-6 text-[#6B5A4B] flex-1 leading-relaxed">
                  {index === 0 && "Located in the historic side of town. The ideal spot for evening chillouts and finding authentic inspiration amidst vintage architecture."}
                  {index === 1 && "Sat beside the softly flowing Jomokerto River. Enjoy incredibly scenic views accompanied by our signature iced, refreshing beverages."}
                  {index === 2 && "A vibrant aesthetic point perfectly aligned to see the sunset. A modern, airy setting with exclusive desserts and creamy treats."}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Locations

