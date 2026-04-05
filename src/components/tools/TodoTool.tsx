import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoTool() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("omnitool-todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("omnitool-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([{ id: Date.now().toString(), text: input, completed: false }, ...todos]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={addTodo} className="flex gap-3 mb-8">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-[#F5F5F4] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-orange-600/20 outline-none"
        />
        <button type="submit" className="bg-orange-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-orange-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Task
        </button>
      </form>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 opacity-30">
            <ListTodo className="w-12 h-12 mx-auto mb-4" />
            <p>No tasks yet. Start by adding one!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                todo.completed ? "bg-gray-50 border-transparent opacity-60" : "bg-white border-[#E7E5E4] shadow-sm"
              }`}
            >
              <button onClick={() => toggleTodo(todo.id)} className="text-orange-600">
                {todo.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
              <span className={`flex-1 text-sm font-medium ${todo.completed ? "line-through" : ""}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
