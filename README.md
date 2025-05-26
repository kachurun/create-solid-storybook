# 🧩 Storybook Solid Integration

This monorepo provides everything you need to use [Storybook](https://storybook.js.org/) with [SolidJS](https://www.solidjs.com/):

- ✅ Custom renderer and framework integration for Solid
- ⚡️ Vite-based bundling
- 🧪 Project scaffold via `npx create-solid-storybook`

---

## 🚀 Getting Started

The easiest way to start using Storybook with SolidJS:

```bash
npx create-solid-storybook <folder-name>
```

Replace `<folder-name>` with your desired project directory name.
It will generate a SolidJS project pre-configured with Storybook 8.

Then run:

```bash
cd <folder-name>
npm run storybook
```

---

## 📦 Packages

### 1. [`create-solid-storybook`](https://www.npmjs.com/package/create-solid-storybook)

A CLI tool to scaffold a new Storybook project for SolidJS.

**Usage:**

```bash
npx create-solid-storybook storybook-solid
cd storybook-solid
npm run storybook
```

Creates a fully working Solid + Storybook 8 project using Vite and essential addons.

**👉 [See a live demo of the generated project on StackBlitz](https://stackblitz.com/edit/storybook-solidjs)**

> **Note:**
> In some monorepo setups, if you use a package manager other than npm (such as `bun` or `pnpm`), you may encounter errors related to peerDependencies after scaffolding. In that case, run your package manager's install command in the generated folder:
>
> ```bash
> cd storybook-solid
> bun install # or pnpm install, depends on your package manager.
> ```
>
> In the worst case, you may need to manually update the `package.json` file in your new project to align dependency versions with those used in your monorepo or workspace.

---

### 2. `@kachurun/storybook-solid-vite` & `@kachurun/storybook-solid`

These two packages power the integration:

| Package                          | Purpose                                                   |
| -------------------------------- | --------------------------------------------------------- |
| `@kachurun/storybook-solid-vite` | SolidJS framework integration for Storybook 8             |
| `@kachurun/storybook-solid`      | Custom renderer for rendering Solid components in stories |

Use them manually if you're adding Solid support to an existing Storybook setup.

---

## 🛠 Manual Setup

If you want to wire it up yourself:

### 1. Install dependencies

```bash
npm install --save-dev \
  storybook \
  @kachurun/storybook-solid-vite \
  @kachurun/storybook-solid \
  @storybook/addon-essentials \
  @storybook/addon-links \
  @storybook/addon-interactions \
  @storybook/addon-viewport \
  @chromatic-com/storybook
```

### 2. `.storybook/main.ts`

```ts
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@kachurun/storybook-solid-vite'

const require = createRequire(import.meta.url)
const getAbsolutePath = (pkg: string) => dirname(require.resolve(join(pkg, 'package.json')))

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
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
  docs: {
    autodocs: 'tag',
  },
}

export default config
```

### 3. Example Story

`stories/Counter.stories.tsx`

```tsx
import { createSignal, createEffect } from 'solid-js'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@kachurun/storybook-solid'

const Counter = (props: { count: number; onIncrement?: () => void; onDecrement?: () => void }) => {
  const [count, setCount] = createSignal(props.count)
  createEffect(() => setCount(props.count))
  return (
    <div>
      <div>Count: {count()}</div>
      <button onClick={() => { setCount(count() - 1); props.onDecrement?.() }}>-</button>
      <button onClick={() => { setCount(count() + 1); props.onIncrement?.() }}>+</button>
    </div>
  )
}

const meta: Meta<typeof Counter> = {
  title: 'Example/Counter',
  component: Counter,
  argTypes: {
    count: { control: { type: 'number' } },
    onIncrement: { action: 'incremented' },
    onDecrement: { action: 'decremented' },
  },
}

type Story = StoryObj<typeof Counter>

export const Default: Story = {
  args: {
    count: 0,
    onIncrement: action('incremented'),
    onDecrement: action('decremented'),
  },
}

export default meta
```

---

## 🧬 Repository Structure

```
.
├── packages/
│   └── create-solid-storybook/ ← CLI tool to scaffold a new Storybook project for SolidJS
|       └── template/           ← Template project copied to users
│   ├── storybook-solid-vite/   ← SolidJS framework adapter for Storybook
│   └── storybook-solid/        ← SolidJS renderer for Storybook
```

---

## 📖 License

MIT

---

Got feedback? Open a discussion or issue. Want to help? PRs welcome.

Made with ❤️ by [@kachurun](https://github.com/kachurun)
