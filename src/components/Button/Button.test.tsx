import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Button } from './Button';

describe('<Button />', () => {
    it('Debería renderizar el botón con el texto "Click me"', () => {
        render(<Button
            label='Click me'
        />);
        const button = screen.getByText('Click me');
        expect(button).toBeInTheDocument();
    });

    it('Debería llamarse la función onClick una vez al hacer click en el botón', async () => {
        const onClick = vi.fn();
        render(<Button
            label='Click me'
            onClick={onClick}
        />);
        const button = screen.getByText('Click me');
        await act(async () => {
            fireEvent.click(button);
        });
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});