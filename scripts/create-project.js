#!/usr/bin/env bun
import { mkdir, writeFile } from "fs/promises"
import { join } from "path"

const projectName = process.argv[2]
if (!projectName) {
  console.log("Usage: bun run new <project-name>")
  process.exit(1)
}

const projectDir = join("projects", projectName)

// Create project structure
await mkdir(join(projectDir, "src"), { recursive: true })

// package.json
const packageJson = {
  name: projectName,
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
  },
  dependencies: {
    react: "workspace:*",
    "react-dom": "workspace:*",
  },
  devDependencies: {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "workspace:*",
    typescript: "^5.2.0",
    vite: "workspace:*",
  },
}

// index.html
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

// vite.config.ts
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/shared": resolve(__dirname, "../../shared"),
    },
  },
  css: {
    postcss: "../../postcss.config.js",
  },
  server: {
    port: ${3000 + Math.floor(Math.random() * 1000)}
  }
})`

// main.tsx
const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`

// App.tsx
const appTsx = `import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">${projectName}</h1>
        <p className="text-muted-foreground">
          Your new project is ready to go!
        </p>
      </motion.div>
    </div>
  )
}

export default App`

// index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`

// Write all files
await writeFile(
  join(projectDir, "package.json"),
  JSON.stringify(packageJson, null, 2),
)
await writeFile(join(projectDir, "index.html"), indexHtml)
await writeFile(join(projectDir, "vite.config.ts"), viteConfig)
await writeFile(join(projectDir, "src", "main.tsx"), mainTsx)
await writeFile(join(projectDir, "src", "App.tsx"), appTsx)
await writeFile(join(projectDir, "src", "index.css"), indexCss)

console.log(`✅ Created project: ${projectName}`)
console.log(`📁 Location: ${projectDir}`)
console.log(`🚀 Run: cd ${projectDir} && bun dev`)
