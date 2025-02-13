import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderItem } from './OrderItem'; // Adjust path as needed
import { Order } from '../../types/Orders'; // Adjust path as needed

// Actúa como un desarrollador front-end con gran experiencia haciendo testing en aplicaciones react con react testing library,
// como test runner usarás vitest de la mano de react testing library para ejecutar test en los componentes,
// te pasaré un componente en el que necesito que me ayudes a hacer sus casos de prueba, el componente es OrderItem.tsx,

vi.mock('../../components/StatusBadge', () => ({
    StatusBadge: ({ status }: { status: string }) => <span data-testid="status-badge">{status}</span>,
}));

describe('OrderItem', () => {
    const mockOrder: Order = {
        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        orderDate: '2023-10-27T10:00:00.000Z',
        status: 'processing',
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        products: [
            {
                id: 'product1',
                name: 'Product A',
                quantity: 3,
                price: 10,
            },
            {
                id: 'product2',
                name: 'Product B',
                quantity: 1,
                price: 20,
            },
        ],
        paymentMethod: 'credit_card',
        total: 40,
    };

    it('renders the order information correctly', () => {
        render(<OrderItem order={mockOrder} />);

        // Check header information
        expect(screen.getByRole('heading', { name: 'Order #a1b2c3d4' })).toBeInTheDocument();
        expect(screen.getByTestId('OrderItem__date').textContent).toBe('Oct 27, 2023, 06:00 AM'); // Adjust expected time based on your timezone
        expect(screen.getByTestId('status-badge')).toHaveTextContent('processing');

        // Check customer information
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

        // Check products information
        expect(screen.getByRole('heading', { name: 'Order Items:' })).toBeInTheDocument();
        expect(screen.getByText('Product A x3')).toBeInTheDocument();
        expect(screen.getByText('$30.00')).toBeInTheDocument();
        expect(screen.getByText('Product B x1')).toBeInTheDocument();
        expect(screen.getByText('$20.00')).toBeInTheDocument();

        // Check footer information
        expect(screen.getByText('Payment Method')).toBeInTheDocument();
        expect(screen.getByText('credit card')).toBeInTheDocument(); // Payment method is transformed
        expect(screen.getByText('Total Amount')).toBeInTheDocument();
        expect(screen.getByText('$40.00')).toBeInTheDocument();
    });


    it('formats the date correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByTestId('OrderItem__date').textContent).toBe('Oct 27, 2023, 06:00 AM'); // Adjust expected time based on your timezone
    });

    it('formats the total correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('$40.00')).toBeInTheDocument();
    });

    it('transforms the payment method correctly', () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText('credit card')).toBeInTheDocument();
    });

    it('displays no products if the order has no products', () => {
        const orderWithoutProducts = { ...mockOrder, products: [] };
        render(<OrderItem order={orderWithoutProducts} />);
        expect(screen.getByRole('heading', { name: 'Order Items:' })).toBeInTheDocument();
        expect(screen.queryByRole('list')).toBeInTheDocument(); // Check if the list is still rendered (empty)
        expect(screen.queryByText('Product A x2')).not.toBeInTheDocument(); // Product A should not be present
    });

    it('renders correctly even with a very long order ID', () => {
        const longOrderId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef-1234567890';
        const orderWithLongId = { ...mockOrder, id: longOrderId };
        render(<OrderItem order={orderWithLongId} />);
        expect(screen.getByRole('heading', { name: `Order #${longOrderId.slice(0, 8)}` })).toBeInTheDocument();
    });
});