import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoFormInput = {
    title: string;
}

type TodoFormProps = {
    onAddTodo: (newTodo: {id: number; title: string}) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
    const { reset, handleSubmit, register } = useForm<TodoFormInput>();

    const onSubmit: SubmitHandler<TodoFormInput> = async (data) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"  // Corrected content type
            },
            body: JSON.stringify({ title: data.title, userId: 1, completed: false }),
        });
        const newTodo = await response.json();
        onAddTodo({ id: newTodo.id, title: data.title });
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter Todo"
                />
                <button type="submit">Send</button>
            </form>
        </>
    );
}

export default TodoForm;
