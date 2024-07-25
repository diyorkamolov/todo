"use client";

import TodoForm from "@/components/TodoForm";
import React, { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";

type Todo = {
  id: number;
  title: string;
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from local storage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // Fetch todos from the API if local storage is empty
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await response.json();
    setTodos(data);
    localStorage.setItem("todos", JSON.stringify(data)); // Save initial todos to local storage
  };

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList onDeleteTodo={deleteTodo} todos={todos} />
    </div>
  );
};

export default Home;