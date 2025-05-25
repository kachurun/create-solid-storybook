# Storybook Solid Integration

This package provides everything you need to use [Storybook](https://storybook.js.org/) with [SolidJS](https://www.solidjs.com/), including a project scaffold, framework integration, and renderer logic.

## Getting Started

The easiest way to get started is to use the `create-solid-storybook` CLI, which will create a new SolidJS project pre-configured with Storybook in just one command:

```sh
npx create-solid-storybook <folder-name>
```

Replace `<folder-name>` with your desired project directory name.

## Packages

### 1. `create-solid-storybook`

A CLI tool to scaffold a new Storybook project for SolidJS.

**Usage:**

```sh
npx create-solid-storybook <folder-name>
```

This will create a new SolidJS project pre-configured with Storybook in the specified `<folder-name>`.

---

### 2. `storybook-solid-framework` and `storybook-solid-renderer`

- `storybook-solid-framework` - A custom Storybook framework for SolidJS, built to work with Vite. This package provides the necessary configuration and integration to use Storybook with SolidJS components.
- `storybook-solid-renderer` - The renderer logic for Storybook to render SolidJS stories. This package handles the low-level rendering and integration with Storybook's core.

#### How to use manually

- **Framework:** SolidJS
- **Bundler:** Vite only

Add this as a dependency in your Storybook project to enable SolidJS support.

#### How to use manually

**Install dependencies**

- Install `storybook`, `storybook-solid-framework`, `storybook-solid-renderer`, and Storybook addons you need (e.g., `@storybook/addon-links`, `@storybook/addon-essentials`, etc.).

**Configure Storybook**

- Create a `.storybook/main.ts` file with the following content:

```ts
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from 'storybook-solid-framework';

const require = createRequire(import.meta.url);
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default <StorybookConfig>{
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: 'storybook-solid-framework',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {},
      },
    });
  },
  docs: {
    autodocs: 'tag',
  },
};
```

**Write a SolidJS story**

- Example: `stories/Counter.stories.tsx`

```tsx
import { action } from '@storybook/addon-actions';
import { createEffect, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solid-renderer';

const Counter = (props: { count: number; onIncrement?: () => void; onDecrement?: () => void }) => {
  const [count, setCount] = createSignal(props.count);
  createEffect(() => { setCount(props.count); });
  return (
    <div>
      <div>Count: <span>{count()}</span></div>
      <button onClick={() => { setCount(count() - 1); props.onDecrement?.(); }}>-</button>
      <button onClick={() => { setCount(count() + 1); props.onIncrement?.(); }}>+</button>
    </div>
  );
};

const meta: Meta<typeof Counter> = {
  title: 'Example/Counter',
  component: Counter,
  argTypes: {
    count: { control: { type: 'number' } },
    onIncrement: { action: 'incremented' },
    onDecrement: { action: 'decremented' },
  },
};

type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    count: 0,
    onIncrement: action('incremented'),
    onDecrement: action('decremented'),
  },
};

export default meta;
```

This setup will allow you to write and view SolidJS stories in Storybook using the custom framework and renderer.

**To run Storybook:**

If you have set up your project manually or using the scaffold, you can start Storybook with:

```sh
npm run storybook
```

This will start the Storybook development server and open the UI in your browser.

---

## Repository Structure

- `packages/storybook-solid-framework` – SolidJS framework integration for Storybook
- `packages/storybook-solid-renderer` – SolidJS renderer for Storybook
- `cli/` – Contains the `create-solid-storybook` CLI scaffold

## License

MIT
