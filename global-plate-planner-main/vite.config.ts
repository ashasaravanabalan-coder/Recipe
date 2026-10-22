import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createChatHandler } from "./server/chat";

// Serves POST /api/chat from the Vite server so the AI key stays out of the browser.
const chatApi = (env: Record<string, string>): Plugin => ({
  name: "chat-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", createChatHandler(env));
  },
  configurePreviewServer(server) {
    server.middlewares.use("/api/chat", createChatHandler(env));
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), chatApi(env), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});