import { useState } from "react";
import { Button } from "../Button";

export const Todo = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [todoAdd, setTodoAdd] = useState<string>("");

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoAdd(e.target.value);
    }

    const handleAddTodo = () => {
        setTodos([...todos, todoAdd]);
        setTodoAdd("");
    }

    return (
        <div>
            <h1>Todo</h1>
            <input type="text" placeholder="Add Todo" value={todoAdd} onChange={handleChangeInput} />
            <Button onClick={handleAddTodo} label="Add" />
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    )
}
