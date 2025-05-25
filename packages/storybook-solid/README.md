# @kachurun/storybook-solid

SolidJS renderer for [Storybook](https://storybook.js.org/), used under the hood by [`@kachurun/storybook-solid-vite`](https://www.npmjs.com/package/@kachurun/storybook-solid-vite).

This package provides the rendering logic required by Storybook to render Solid components and exports **typed helpers** for writing stories in CSF format.

---

## 📦 Installation

You don't need to install this package directly if you're using the [`create-solid-storybook`](https://www.npmjs.com/package/create-solid-storybook) CLI — it's already included.

However, you can install it manually if you're configuring your setup from scratch or want to use its types:

```bash
npm install --save-dev @kachurun/storybook-solid
```

---

## ✨ What it provides

This package:

- Registers a `SolidRenderer` for Storybook
- Enables Storybook to mount and render SolidJS components
- Exports type-safe helpers like `Meta`, `StoryObj`, `Decorator`, etc. for writing stories in CSF2/CSF3

---

## 🧩 Example Usage

You can import types like this:

```ts
import type { Meta, StoryObj } from '@kachurun/storybook-solid'
```

```tsx
const Counter = (props: { count: number; onIncrement?: () => void }) => {
  const [count, setCount] = createSignal(props.count)
  return (
    <div>
      <div>Count: {count()}</div>
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
  },
}

type Story = StoryObj<typeof Counter>

export const Default: Story = {
  args: {
    count: 0,
    onIncrement: () => console.log('+1'),
  },
}

export default meta
```

---

## 🧠 Exported Types

| Type              | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `Meta<T>`         | Type-safe story metadata (CSF default export)     |
| `StoryObj<T>`     | Type-safe story definition (CSFv3 named export)   |
| `StoryFn<T>`      | Alternative function-based story type             |
| `Decorator<T>`    | Decorator function type for Solid stories         |
| `Loader<T>`       | Loader function type                              |
| `StoryContext<T>` | Context type passed to decorators/loaders         |
| `Preview`         | Top-level Storybook config (used in `preview.ts`) |
| `SolidRenderer`   | The renderer type itself (usually internal)       |

---

## 📖 License

MIT

Maintained by [@kachurun](https://github.com/kachurun)
