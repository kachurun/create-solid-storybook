import type { Args, WebRenderer } from '@storybook/types';
import type { Component, JSXElement } from 'solid-js';

export type { RenderContext } from '@storybook/types';
export type { StoryContext } from '@storybook/types';

export interface SolidRenderer extends WebRenderer {
    component: Component<this['T']>;
    storyResult: StoryFnSolidReturnType;
}

export interface ShowErrorArgs {
    title: string;
    description: string;
}

export type StoryFnSolidReturnType = JSXElement;
export type ComponentsData = {
    [key: string]: { args: Args; rendered?: boolean; disposeFn?: () => void };
};
