import { render, screen, fireEvent } from "@testing-library/react";
import { TodoForm } from "../src/components/TodoForm";
import { describe, it, expect, vi } from "vitest";

describe("TodoForm", () => {
  it("llama onAdd al enviar el formulario", () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText("Título de la tarea"), {
      target: { value: "Nueva tarea" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /agregar/i }));
    expect(onAdd).toHaveBeenCalledWith("Nueva tarea", "");
  });
});