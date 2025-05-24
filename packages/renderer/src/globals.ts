import { global } from '@storybook/global';

// @ts-expect-error global is not typed
const { window: globalWindow } = global;

globalWindow.STORYBOOK_ENV = 'solid';
