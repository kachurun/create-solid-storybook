import { action } from '@storybook/addon-actions';
import { createEffect, createSignal } from 'solid-js';

import type { Meta, StoryObj } from '@kachurun/storybook-solid';
import './Counter.stories.css';

const Counter = (props: { count: number; onIncrement?: () => void; onDecrement?: () => void }) => {
    // eslint-disable-next-line solid/reactivity
    const [count, setCount] = createSignal(props.count);

    createEffect(() => {
        setCount(props.count);
    });

    const handleIncrement = () => {
        setCount(count() + 1);
        props.onIncrement?.();
    };

    const handleDecrement = () => {
        setCount(count() - 1);
        props.onDecrement?.();
    };

    return (
        <div class="counter-root">
            <div class="counter-count">
                Count:
                {' '}
                <span class="counter-count-value">{count()}</span>
            </div>
            <div class="counter-buttons">
                <button
                    onClick={ handleDecrement }
                    class="counter-btn decrement"
                    aria-label="Decrement"
                >
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="4" y="9" width="12" height="2" rx="1" fill="currentColor" />
                    </svg>
                </button>
                <button
                    onClick={ handleIncrement }
                    class="counter-btn increment"
                    aria-label="Increment"
                >
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="4" y="9" width="12" height="2" rx="1" fill="currentColor" />
                        <rect x="9" y="4" width="2" height="12" rx="1" fill="currentColor" />
                    </svg>
                </button>
            </div>
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
