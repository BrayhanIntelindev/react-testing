import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { SessionProvider } from '../../context/AuthContext';
import { getAuth } from '../../services/getAuth'
import { Login } from './Login';

vi.mock("../../services/getAuth", () => ({
    getAuth: vi.fn()
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
});

const mockGetAuth = getAuth as Mock;
const mockNavigate = vi.fn();
const errorMessage = 'Invalid username or password'

describe('<Login />', () => {
    const handleLogin = () => {
        return render(
            <SessionProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </SessionProvider>
        );
    }

    it('should can show error message', async () => {
        mockGetAuth.mockRejectedValue(new Error(errorMessage));
        handleLogin();
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const submit = screen.getByRole('button', { name: 'Login' });

        await act(async () => {
            fireEvent.change(username, { target: { value: 'wrongUser' } });
            fireEvent.change(password, { target: { value: 'wrongPassword' } });
            fireEvent.click(submit);
        });

        const error = screen.getByText(errorMessage);
        expect(error).toBeInTheDocument();
    })

    it('should can show/hide password', async () => {
        handleLogin();
        const password = screen.getByPlaceholderText('Password');
        const toggle = screen.getByRole('button', { name: 'show' });

        expect(password).toHaveAttribute('type', 'password');

        await act(async () => {
            fireEvent.click(toggle);
        });

        expect(password).toHaveAttribute('type', 'text');

        await act(async () => {
            fireEvent.click(toggle);
        });

        expect(password).toHaveAttribute('type', 'password');
    })

    it('should redirect to home page when login success', async () => {

        mockGetAuth.mockResolvedValue({ success: true });
        handleLogin();

        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const submit = screen.getByRole('button', { name: 'Login' });

        await act(async () => {
            fireEvent.change(username, { target: { value: 'successUser' } });
            fireEvent.change(password, { target: { value: 'successPassword' } });
            fireEvent.click(submit);
        });

        await waitFor(() => {
            expect(mockGetAuth).toHaveBeenCalledWith('successUser', 'successPassword');
            expect(mockNavigate).toHaveBeenCalledWith('/orders');
        });

    })
});