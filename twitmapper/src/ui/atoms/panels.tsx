import styled from 'styled-components';

export type Orientation = 'vertical' | 'horizontal';

export type StackPanelProps = {
    orientation: 'vertical' | 'horizontal';
    stretchToVertical?: boolean;
    stretchToHorizontal?: boolean;
};

function getStackPanelDirection(direction: Orientation) {
    if (direction === 'vertical') return 'column';
    if (direction === 'horizontal') return 'row';

    throw new Error('invalid panel direction');
}

export const StackPanel = styled.div<StackPanelProps>`
    display: flex;
    flex-direction: ${({ orientation }) => getStackPanelDirection(orientation)};
    ${(p) =>
        p.stretchToHorizontal &&
        `
        width: 100%;
    `}

    ${(p) =>
        p.stretchToVertical &&
        `
        min-height: 100%;
    `}
`;