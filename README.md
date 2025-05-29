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
It will generate a SolidJS project pre-configured with Storybook 9.

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
  @storybook/addon-onboarding \
  @storybook/addon-docs \
  @storybook/addon-a11y \
  @storybook/addon-vitest \
  @storybook/addon-links
```

### 2. Configure Storybook init files

`.storybook/main.ts`

```ts
import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@kachurun/storybook-solid-vite';

export default <StorybookConfig>{
    framework: '@kachurun/storybook-solid-vite',
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
        '@storybook/addon-links',
    ],
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': {},
            },
        });
    },
};
```

`.storybook/preview.ts`

```ts
import type { Preview } from '@kachurun/storybook-solid';

export const tags = ['autodocs'];

const preview: Preview = {
    parameters: {
        // automatically create action args for all props that start with "on"
        actions: { argTypesRegex: '^on.*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: {
            codePanel: true,
        },
    },
};

export default preview;
```

### 3. Create a Storybook Story

`stories/Counter.stories.tsx`

```tsx
import { createSignal, createEffect } from 'solid-js'
import { action } from 'storybook/actions'
import type { Meta, StoryObj } from '@kachurun/storybook-solid-vite'

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

## 🙏 Special Thanks

This project is inspired by and builds upon the work of the community-maintained [storybookjs/solidjs](https://github.com/storybookjs/solidjs) project.
Special thanks to all its contributors for their foundational efforts in bringing Storybook to SolidJS.

---

## 📖 License

MIT

---

Got feedback? Open a discussion or issue. Want to help? PRs welcome.

Made with ❤️ by [@kachurun](https://github.com/kachurun)
