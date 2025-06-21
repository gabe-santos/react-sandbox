import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">liquid-glass</h1>
        <p className="text-muted-foreground">
          Your new project is ready to go!
        </p>
      </motion.div>
    </div>
  )
}

export default App