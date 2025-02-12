import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Calculator } from './Calculator';

describe('<Calculator/>', () => {
    const useCaseTest = [
        { a: 1, b: 2, operation: "add", expected: 3 },
        { a: 1, b: 2, operation: "subtract", expected: -1 },
        { a: 1, b: 2, operation: "multiply", expected: 2 },
        { a: 0, b: 1, operation: "multiply", expected: 0 },
        { a: 1, b: 2, operation: "divide", expected: 0.5 },
        { a: 1, b: 0, operation: "divide", expected: "Error" },
        { a: 1, b: 2, operation: "invalid", expected: "Invalid operation" },
    ]

    it.each(useCaseTest)(`should return $expected when a=$a, b=$b, operation=$operation`, ({ a, b, operation, expected }) => {
        render(<Calculator a={a} b={b} operation={operation} />);
        const result = screen.getByText(`Result: ${expected}`);
        expect(result).toBeInTheDocument();
    })
})
