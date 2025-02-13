import { ReactNode } from 'react';
import { describe, it, expect, Mock, vi, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw'
import { renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SessionProvider, useSession } from '../context/AuthContext'
import { server } from '../mocks/servers'
import useOrder from './useOrder';

vi.mock("../context/AuthContext", async () => {
    const actual = await vi.importActual('../context/AuthContext');
    return {
        ...actual,
        useSession: vi.fn()
    }
});

const mockUseSession = useSession as Mock;

describe('useOrder MSW', () => {
    const mockUser = {
        id: '123',
        name: 'John Doe',
    };

    beforeEach(() => {
        mockUseSession.mockReturnValue({ user: mockUser });
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <MemoryRouter>
            <SessionProvider>{children}</SessionProvider>
        </MemoryRouter>
    );

    it('should return orders', async () => {
        const { result } = renderHook(() => useOrder(), { wrapper });

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.orders.length).toEqual(1)
        });

    });

    it('should return 500', async () => {
        server.use(
            http.get('http://localhost:3001/orders', () => {
                return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
            }
            ));

        const { result } = renderHook(() => useOrder(), { wrapper });
        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toEqual('Failed to fetch orders. Please try again later.')
        });
    });
});