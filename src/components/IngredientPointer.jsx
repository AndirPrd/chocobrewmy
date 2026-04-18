import { motion } from 'framer-motion'

function IngredientPointer({ x, y, text }) {
  return (
    <div
      className="absolute w-40 flex flex-col items-center pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
        className="rounded-xl border border-choco-200 bg-cream-50/95 px-3 py-2 text-xs text-choco-800 shadow-cozy text-center"
      >
        {text}
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 24, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
        className="w-px bg-choco-500/70"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="h-2 w-2 rounded-full bg-choco-600"
      />
    </div>
  )
}

export default IngredientPointer
