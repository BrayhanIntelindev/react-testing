import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Todo } from "./Todo";


describe("<Todo />", () => {
    const useCaseTest = ["Todo 1", "Todo 2", "Todo 3"];

    it("should render the component", () => {
        render(<Todo />);
        const todo = screen.getByText("Todo");
        expect(todo).toBeInTheDocument();
    });

    it.each(useCaseTest)("should add %s", async (todo) => {
        render(<Todo />);
        const input = screen.getByPlaceholderText("Add Todo");
        await act(async () => {
            fireEvent.change(input, { target: { value: todo } });
        });
        const button = screen.getByText("Add");
        await act(async () => {
            fireEvent.click(button);
        });
        const todoElement = screen.getByText(todo);
        expect(todoElement).toBeInTheDocument();
    });
})