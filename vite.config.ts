import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": "/src",
        "@shared": "/src/shared",
        "@widget": "/src/widget",
      },
    },
    css: {
      modules: {
        scopeBehaviour: "local",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        globalModulePaths: [/global\.(css|less|sass|scss)$/],
        localsConvention: "camelCase",
      },
    },
    define: {
      __IS_DEV__: mode === "development",
      __API__: JSON.stringify(env.VITE_API_URL),
      __SERVER__: JSON.stringify(env.VITE_SERVER_URL),
    },
  }
})
