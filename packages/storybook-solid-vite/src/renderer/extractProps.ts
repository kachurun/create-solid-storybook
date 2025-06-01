import { extractComponentProps } from 'storybook/internal/docs-tools';

import type { PropDef } from 'storybook/internal/docs-tools';

// FIXME: Replace with actual Solid component type
// TODO: Implement Solid-specific logic for isMemo, enhancePropTypesProps, enhanceTypeScriptProps if needed
// For now, stub them out or adapt as needed for Solid

type Component = any;

export interface PropDefMap {
    [p: string]: PropDef;
}

function getPropDefs(component: Component, section: string): PropDef[] {
    const processedComponent = component;

    // if (hasDocgen(component)) {
    //     processedComponent = component;
    // }

    const extractedProps = extractComponentProps(processedComponent, section);

    if (extractedProps.length === 0) {
        return [];
    }

    // switch (extractedProps[0].typeSystem) {
    //     case TypeSystem.JAVASCRIPT:
    //         return enhancePropTypesProps(extractedProps, component);
    //     case TypeSystem.TYPESCRIPT:
    //         return enhanceTypeScriptProps(extractedProps);

    //     default:
    //         return extractedProps.map(x => x.propDef);
    // }

    return extractedProps.map(x => x.propDef);
}

export const extractProps = (component: Component) => ({
    rows: getPropDefs(component, 'props'),
});
