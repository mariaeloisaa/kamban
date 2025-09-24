import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CadUsuario } from "../pages/CadUsuario";

describe("Cadastro de Usuário", () => {
  it("Teste de Validar os itens em tela", () => {
    render(<CadUsuario />);
    const nomeInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const botao = screen.getByRole("button", { name: /Cadastrar/i });

    expect(nomeInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(botao).toBeTruthy();
  });

  it("Teste de Campos Vazios", async () => {
    render(<CadUsuario />);
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Informe ao menos um valor para o username")
      ).toBeTruthy();
      expect(
        screen.getByText("Informe ao menos um valor para o email")
      ).toBeTruthy();
    });
  });

  it("Username maior que 50 caracteres deve falhar", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "a".repeat(51) },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Informe no máximo 50 caracteres para o username")
      ).toBeTruthy();
    });
  });

  it("Username inválido (com números) deve falhar", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Eloisa123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Nome inválido. Use apenas letras, espaços simples ou hífens entre palavras, sem começar ou terminar com eles"
        )
      ).toBeTruthy();
    });
  });

  it("Username inválido (hífen no começo)", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "-Eloisa" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Nome inválido. Use apenas letras, espaços simples ou hífens entre palavras, sem começar ou terminar com eles"
        )
      ).toBeTruthy();
    });
  });

  it("Username válido deve passar", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Maria Eloisa" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "teste@email.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Nome inválido|Informe no máximo/)
      ).toBeNull();
    });
  });

  it("Email inválido deve falhar", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "email-invalido" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Formato de e-mail incorreto")).toBeTruthy();
    });
  });

  it("Email válido deve passar", async () => {
    render(<CadUsuario />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Eloisa" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "valido@teste.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Formato de e-mail incorreto/)).toBeNull();
    });
  });
});
