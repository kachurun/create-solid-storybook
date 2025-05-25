/* Configuration for doc-mode renderer (`storybook dev --docs`). */

import {
    enhanceArgTypes,
    extractComponentDescription,
} from '@storybook/docs-tools';


import { sourceDecorator } from './docs/sourceDecorator';

import type { Decorator, SolidRenderer } from './public-types';
import type { ArgTypesEnhancer } from '@storybook/types';

export const parameters = {
    docs: {
        story: { inline: true },
        extractComponentDescription,
    },
};

export const decorators: Decorator[] = [sourceDecorator];

export const argTypesEnhancers: ArgTypesEnhancer<SolidRenderer>[] = [
    enhanceArgTypes,
];
