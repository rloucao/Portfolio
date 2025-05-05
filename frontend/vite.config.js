import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPEG", "**/*.jpeg", "**/*.jpg", "**/*.png", "**/*.svg"],
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
});
