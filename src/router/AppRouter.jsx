import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Cart from '../pages/Cart'
import DrinkDetail from '../pages/DrinkDetail'
import Home from '../pages/Home'
import Locations from '../pages/Locations'
import Menu from '../pages/Menu'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/drink/:group" element={<DrinkDetail />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default AppRouter

