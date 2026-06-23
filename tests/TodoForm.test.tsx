import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { TodoList } from "../src/components/TodoList";
import { describe, it, expect, vi } from "vitest";
import type { Task } from "../src/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Tarea de prueba",
    description: "Descripción de prueba",
    completed: false,
    userId: "user1",
    createdAt: Date.now(),
  },
];

describe("TodoList", () => {
  it("muestra las tareas correctamente", () => {
    render(
      <TodoList
        tasks={mockTasks}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay tareas", () => {
    render(
      <TodoList
        tasks={[]}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText(/No tenés tareas todavía/i)).toBeInTheDocument();
  });
});