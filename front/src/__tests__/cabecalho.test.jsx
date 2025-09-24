import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cabecalho } from "../components/cabecalho";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("Componentes de Cabecalho", () => {
  it("Renderiza o titulo", () => {
    render(
      <MemoryRouter>
        <Cabecalho />
      </MemoryRouter>
    );

    const titulo = screen.getByRole("heading", { name: "Gerenciamento de Tarefas" });
    expect(titulo).toBeInTheDocument();
  });

  it("Usa a tag header com a classe correta?", () => {
    render(
      <MemoryRouter>
        <Cabecalho />
      </MemoryRouter>
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("cabecalho");
  });
});
