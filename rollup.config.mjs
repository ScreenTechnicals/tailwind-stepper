import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
  ],
  external: ["react", "react-dom", "tailwind-merge"],
});
