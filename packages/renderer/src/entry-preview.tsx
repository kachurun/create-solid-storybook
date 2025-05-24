/* Configuration for default renderer. */

import { solidReactivityDecorator } from './renderToCanvas';

import type { Decorator } from './public-types';

export const parameters = { renderer: 'solid' };
export { render } from './render';
export { renderToCanvas } from './renderToCanvas';

export const decorators: Decorator[] = [solidReactivityDecorator];
