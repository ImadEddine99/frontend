import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcssConfig from "./postcss.config.cjs";
import path from 'path';
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
   base:"routefuel_front",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
