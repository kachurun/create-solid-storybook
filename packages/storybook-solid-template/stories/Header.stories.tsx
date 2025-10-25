import preview from "#.storybook/preview";

import { fn } from "storybook/test";

import { Header } from "./Header";

const meta = preview.meta({
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
});

export const LoggedIn = meta.story({
  args: {
    user: {
      name: "Jane Doe",
    },
  },
});

export const LoggedOut = meta.story();
