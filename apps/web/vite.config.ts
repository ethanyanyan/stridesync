import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      dts: "src/auto-imports.d.ts", // generates typings
      resolvers: [
        (name: string) => {
          if (["Button", "Input", "Select"].includes(name))
            return { importName: name, path: "components/ui" };
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      components: "/src/components",
    },
  },
});
