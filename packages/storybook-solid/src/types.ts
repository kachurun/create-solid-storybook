import type { Args, WebRenderer } from '@storybook/types';
import type { Component, JSXElement } from 'solid-js';

export type { RenderContext, StoryContext } from '@storybook/types';

export interface SolidRenderer extends WebRenderer {
    // @ts-expect-error: Fix error in Github actions
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
