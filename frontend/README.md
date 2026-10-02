# React + TypeScript + Vite

This frontend uses React, TypeScript, Vite, Tailwind CSS, Prettier, and Oxlint. Run `npm run build` to type-check the project and create a production bundle.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

Oxlint checks both TypeScript and React source. TypeScript's strict compiler settings provide the type-aware validation during `npm run build`.
