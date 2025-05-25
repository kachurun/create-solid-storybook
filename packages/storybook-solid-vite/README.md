# @kachurun/storybook-solid-vite

Custom [Storybook](https://storybook.js.org/) **framework adapter** for [SolidJS](https://www.solidjs.com/), using Vite as the bundler.

> This package is part of the [`create-solid-storybook`](https://github.com/kachurun/create-solid-storybook) project.

---

## ✨ Features

- 🧩 Full SolidJS + Storybook integration
- ⚡️ Built on top of Vite for fast dev experience
- 🔌 Supports all major addons (`@storybook/addon-essentials`, `interactions`, etc.)

---

## 📦 Installation

```bash
npm install --save-dev @kachurun/storybook-solid-vite @kachurun/storybook-solid
```

You also need core Storybook dependencies and any addons you want to use:

```bash
npm install --save-dev \
  @storybook/addon-essentials \
  @storybook/addon-links \
  @storybook/addon-viewport \
  @storybook/addon-interactions \
  @chromatic-com/storybook
```

---

## 🔧 Usage

In your `.storybook/main.ts`:

```ts
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@kachurun/storybook-solid-vite'

const require = createRequire(import.meta.url)
const getAbsolutePath = (pkg: string) => dirname(require.resolve(join(pkg, 'package.json')))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx', '../stories/**/*.mdx'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: '@kachurun/storybook-solid-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: { 'process.env': {} },
    })
  },
}

export default config
```

---

## 🛠 Compatibility

| Tool      | Version   |
| --------- | --------- |
| SolidJS   | `>=1.9.0` |
| Storybook | `^8.0.0`  |
| Vite      | `^6.0.0`  |
| Node.js   | `>=18`    |

---

## 🚧 Limitations

- Autodocs are not currently supported.
- MDX stories work, but importing Solid components into MDX is not currently supported.

---

## 📖 License

MIT

Maintained by [@kachurun](https://github.com/kachurun)
