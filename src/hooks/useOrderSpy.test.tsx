import { describe, it, expect, vi, MockInstance, beforeEach, afterEach, } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react'
// import * as ReactRouter from 'react-router-dom';
import useOrder from './useOrder';
import * as AuthContext from '../context/AuthContext';
import * as OrderService from '../services/getOrders';

vi.mock("react-router-dom", async () => ({
    useNavigate: () => vi.fn()
}));

describe('useOrder with spy', () => {
    let useSessionSpy: MockInstance;
    let getOrdersSpy: MockInstance;
    let consoleErrorSpy: MockInstance;
    // const mockNavigate = vi.fn();

    beforeEach(() => {
        useSessionSpy = vi.spyOn(AuthContext, 'useSession');
        getOrdersSpy = vi.spyOn(OrderService, 'getOrders');
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        // (ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);

        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should show a error message when fetching orders fails', async () => {
        useSessionSpy.mockReturnValue({ user: { id: '123' } });
        getOrdersSpy.mockRejectedValue(new Error('Failed to fetch orders'));

        const { result } = renderHook(() => useOrder());
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null)

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBe('Failed to fetch orders. Please try again later.')
        });

        expect(getOrdersSpy).toHaveBeenCalledTimes(1);
    });
});