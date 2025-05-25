import { action } from '@storybook/addon-actions';
import { createEffect, createSignal } from 'solid-js';

import type { Meta, StoryObj } from 'storybook-solid-renderer';
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
                >
                    -
                </button>
                <button
                    onClick={ handleIncrement }
                    class="counter-btn increment"
                >
                    +
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
