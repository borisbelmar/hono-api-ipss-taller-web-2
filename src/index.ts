import { Hono } from "hono";
import { serve } from "@hono/node-server";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: "Learn Hono", completed: false },
  { id: 2, title: "Build a REST API", completed: false },
];

const app = new Hono()

app.get("/todos", (c) => {
  return c.json(todos);
})

app.get("/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"))
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(todo);
})

app.post("/todos", async (c) => {
  const body = await c.req.json();

  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false
  }
  todos.push(newTodo)
  return c.json(newTodo, 201);
})

app.put("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const body = await c.req.json();

  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return c.json({ error: "Todo not found" }, 404);
  }

  const updatedTodo: Todo = {
    ...todos[todoIndex],
    title: body.title ?? todos[todoIndex].title,
    completed: body.completed ?? todos[todoIndex].completed
  }
  todos[todoIndex] = updatedTodo;
  return c.json(updatedTodo);
})

app.delete("/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"))
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return c.json({ error: "Todo not found" }, 404);
  }

  todos.splice(todoIndex, 1);
  return c.json({ message: "Todo deleted" });
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Server is running on http://localhost:3000");
})