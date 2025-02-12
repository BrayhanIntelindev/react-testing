import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Counter } from "./Counter";


describe("<Counter />", () => {
    it("should render the component", () => {
        render(<Counter />);
        const counter = screen.getByText("clicked 0 times");
        expect(counter).toBeInTheDocument();
    });

    it("should increment the counter", async () => {
        render(<Counter />);
        const button = screen.getByText("Increment");
        await act(async () => {
            fireEvent.click(button);
        });
        const counter = screen.getByText("clicked 1 times");
        expect(counter).toBeInTheDocument();
    });
})