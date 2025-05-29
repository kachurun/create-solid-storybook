# 🧩 Storybook Solid Integration

This monorepo provides everything you need to use [Storybook](https://storybook.js.org/) with [SolidJS](https://www.solidjs.com/):

- ✅ Custom renderer and framework integration for Solid
- ⚡️ Vite-based bundling
- 🧪 Project scaffold via `npx create-solid-storybook`

---

## 🚀 Getting Started

The fastest way to start using Storybook with SolidJS:

```bash
npx create-solid-storybook <folder-name>
```

Replace `<folder-name>` with your desired project directory name. This will generate a SolidJS project pre-configured with Storybook 9 and all essential addons.

Then run:

```bash
cd <folder-name>
npm run storybook
```

Open the provided URL in your browser to view your Storybook instance.

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

Creates a fully working Solid + Storybook 9 project using Vite and essential addons.

👉 [See a live demo of the generated project on StackBlitz](https://stackblitz.com/edit/storybook-solidjs)

> **Note:**
> In some monorepo setups, or if you use a package manager other than npm (such as `bun` or `pnpm`), you may encounter errors related to peerDependencies after scaffolding. In that case, run your package manager's install command in the generated folder:
>
> ```bash
> cd storybook-solid
> npm install # or bun / pnpm install, depending on your package manager
> ```
>
> If you encounter dependency version conflicts, manually update the `package.json` in your new project to align with your monorepo or workspace.

---

### 2. `@kachurun/storybook-solid-vite` & `@kachurun/storybook-solid`

These packages power the integration:

| Package                              | Purpose                                       |
| ------------------------------------ | --------------------------------------------- |
| `@kachurun/storybook-solid-vite`     | SolidJS framework integration for Storybook 8 |
| `@kachurun/storybook-solid-template` | Scaffolding template for Storybook            |

Use them manually if you're adding Solid support to an existing Storybook setup.

### 3. Create a Storybook Story

Example `stories/Counter.stories.tsx`:

```tsx
import { createSignal, createEffect } from 'solid-js';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@kachurun/storybook-solid-vite';

const Counter = (props: { count: number; onIncrement?: () => void; onDecrement?: () => void }) => {
  const [count, setCount] = createSignal(props.count);
  createEffect(() => setCount(props.count));
  return (
    <div>
      <div>Count: {count()}</div>
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

---

## 🧬 Monorepo & Dependency Management

This repo and its templates are designed to work both as standalone projects and as packages in a monorepo (subdirectory) setup.

- **Standalone:** All required dependencies are included in `devDependencies` for out-of-the-box usage.
- **Monorepo/subdir:** Core dependencies are also listed in `peerDependencies` so your workspace manager can warn you about version mismatches. If you use this template in a subdirectory, ensure the required peer dependencies are installed at the root or hoisted level.

> **Tip:** If you encounter dependency conflicts, align the versions in your root and subproject `package.json` files.

---

## 🗂 Repository Structure

```
.
├── packages/
│   └── create-solid-storybook/   # CLI tool to scaffold a new Storybook project for SolidJS
│   └── storybook-solid-template/ # Template project copied to users
│   └── storybook-solid-vite/     # SolidJS framework adapter for Storybook
```

---

## 🙏 Special Thanks

This project is inspired by and builds upon the work of the community-maintained [storybookjs/solidjs](https://github.com/storybookjs/solidjs) project. Special thanks to all its contributors for their foundational efforts in bringing Storybook to SolidJS.

---

## 👤 Maintainer

Maintained with ❤️ by [@kachurun](https://github.com/kachurun)

---

## 📖 License

MIT

Got feedback? Open a discussion or issue. Want to help? PRs welcome.
