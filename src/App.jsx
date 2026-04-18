import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <div className="min-h-screen bg-cream-50 text-choco-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-8 pt-0 sm:px-6">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
