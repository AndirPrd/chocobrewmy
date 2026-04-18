import { useEffect, useState } from 'react'
import { ShoppingBag, ArrowDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo/ChocoBrewmy_Logo.png'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/locations', label: 'Locations' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const { totalItems, recentAddition } = useCart()
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const headerEl = document.querySelector('header')

    const handleScroll = () => {
      let heroId = null;
      if (pathname === '/') {
        heroId = 'home-hero-sequence';
      } else if (pathname === '/about') {
        heroId = 'about-hero-sequence';
      } else if (pathname === '/locations') {
        heroId = 'locations-hero-sequence';
      }

      if (heroId) {
        const heroEl = document.getElementById(heroId)
        if (heroEl) {
          const heroBottom = heroEl.getBoundingClientRect().bottom
          const headerHeight = headerEl?.offsetHeight ?? 96
          setIsScrolled(heroBottom <= headerHeight + 4)
          return
        }
      }

      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'border-b border-choco-200 bg-cream-100/95 backdrop-blur'
          : 'border-b border-transparent bg-transparent'
          }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <NavLink className="inline-flex items-center" to="/">
            <img src={logo} alt="Chocobrewmy logo" className="h-16 w-auto object-contain" />
          </NavLink>

          <div className="flex items-center gap-6 text-base font-medium">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full border px-4 py-2 transition ${isActive
                    ? 'border-choco-300 bg-cream-100/95 text-choco-800'
                    : 'border-choco-200 bg-cream-50/90 text-choco-700 hover:bg-cream-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-choco-700 px-5 py-2.5 text-cream-50"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              <span className="rounded-full bg-fresh-peach px-2 py-0.5 text-xs font-bold text-choco-900">
                {totalItems}
              </span>
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Floating Scroll Indicator */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-all duration-700 pointer-events-none ${(pathname === '/' || pathname === '/about' || pathname === '/locations') && !isScrolled
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
          }`}
      >
        <span className="text-base font-bold uppercase tracking-widest text-[#fbf5ee] drop-shadow-lg [-webkit-text-stroke:0.5px_#4A3B32]">
          Scroll Down
        </span>
        <div className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-[#5C4535]/80 text-[#fbf5ee] backdrop-blur-sm shadow-xl border border-[#E5D7C5]/30">
          <ArrowDown size={42} />
        </div>
      </div>

      <AnimatePresence>
        {recentAddition && (
          <motion.div
            key="toast-active"
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm rounded-2xl border border-choco-200 bg-cream-50/95 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <img 
                src={recentAddition.item.image} 
                alt={recentAddition.item.name} 
                className="h-12 w-12 rounded-xl object-cover shadow-sm" 
              />
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8C6B55]">Added to Cart</p>
                <p className="font-semibold text-[#4A3B32]">{recentAddition.quantity}x {recentAddition.item.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
