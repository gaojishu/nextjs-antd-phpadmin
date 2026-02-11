import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

//const __filename = fileURLToPath(import.meta.url);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    "react-hooks/exhaustive-deps": "off",
    // 1. 允许以下划线 _ 开头的变量不被检查
    // 2. 允许在解构时提取但不使用变量 (ignoreRestSiblings)
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    // 3. 将 any 限制降级为警告，避免阻塞开发
    "@typescript-eslint/no-explicit-any": "warn",
  }
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}];

export default eslintConfig;
