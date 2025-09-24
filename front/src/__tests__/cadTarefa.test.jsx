import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CadTarefa } from "../pages/CadTarefa";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom';


vi.mock("axios");

describe("Cadastro de Tarefa", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, username: "Teste" }],
    });
  });

  it("Renderiza todos os campos do formulário", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const descricao = await screen.findByLabelText(/Descrição/i);
    const setor = screen.getByLabelText(/Setor/i);
    const usuario = screen.getByLabelText(/Usuário/i);
    const prioridade = screen.getByLabelText(/Prioridade/i);
    const botao = screen.getByRole("button", { name: /Cadastrar/i });

    expect(descricao).toBeInTheDocument();
    expect(setor).toBeInTheDocument();
    expect(usuario).toBeInTheDocument();
    expect(prioridade).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  it("Campos vazios devem mostrar erros", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Informe uma descrição")).toBeTruthy();
      expect(screen.getByText("Informe o setor")).toBeTruthy();
      expect(screen.getByText("Selecione o usuário")).toBeTruthy();
      expect(screen.getByText("Selecione a prioridade")).toBeTruthy();
    });
  });

  it("Descrição maior que 254 caracteres deve falhar", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Descrição/i), {
      target: { value: "a".repeat(255) },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Informe no máximo 254 caracteres")
      ).toBeTruthy();
    });
  });

  it("Descrição inválida sem letra/número deve falhar", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Descrição/i), {
      target: { value: "!!!!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Descrição inválida. Deve conter pelo menos uma letra ou número"
        )
      ).toBeTruthy();
    });
  });

  it("Setor maior que 50 caracteres deve falhar", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Setor/i), {
      target: { value: "a".repeat(51) },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Informe um setor de no máximo 50 caracteres")
      ).toBeTruthy();
    });
  });

  it("Setor inválido (hífen no começo) deve falhar", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Setor/i), {
      target: { value: "-Financeiro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Setor inválido. Use letras, números, espaços simples ou hífens entre palavras, sem começar ou terminar com eles"
        )
      ).toBeTruthy();
    });
  });

  it("Formulário válido deve passar sem erros", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Descrição/i), {
      target: { value: "Revisar relatórios semanais" },
    });
    fireEvent.input(screen.getByLabelText(/Setor/i), {
      target: { value: "Financeiro" },
    });
    fireEvent.change(screen.getByLabelText(/Usuário/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Prioridade/i), {
      target: { value: "Alta" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Informe uma descrição/)).toBeNull();
      expect(screen.queryByText(/Informe o setor/)).toBeNull();
      expect(screen.queryByText(/Selecione o usuário/)).toBeNull();
      expect(screen.queryByText(/Selecione a prioridade/)).toBeNull();
    });
  });
});
