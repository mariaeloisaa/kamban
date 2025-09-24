import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

const schemaCadUsuario = z.object({
  username: z.string()
    .min(1, "Informe ao menos um valor para o username")
    .max(50, "Informe no máximo 50 caracteres para o username")
    .regex(
      /^(?![-\s]+$)[a-zA-ZÀ-ÿÇç]+(?:[ '-]?[a-zA-ZÀ-ÿÇç]+)*$/,
      "Nome inválido. Use apenas letras, espaços simples ou hífens entre palavras, sem começar ou terminar com eles"
    ),
  email: z
    .string()
    .min(1, "Informe ao menos um valor para o username")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
      "Formato de e-mail incorreto"
    ),
});

export function CadUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaCadUsuario)
  });

  async function obterDados(data) {
    try {
      await axios.post("http://127.0.0.1:8000/usuario/", {
        username: data.username,
        email: data.email
      });
      alert("Usuário cadastrado com sucesso!");
      reset();
    } catch (error) {
      alert("Erro ao cadastrar usuário");
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  return (
    <section className="formulario" aria-label="Formulário de cadastro de usuário">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit(obterDados)}>
        <label htmlFor="username">Username:</label>
        <input 
          id="username" 
          type="text" 
          {...register("username")} 
          aria-invalid={errors.username ? "true" : "false"} 
          aria-describedby={errors.username ? "username-erro" : undefined}
        />
        {errors.username && <p id="username-erro" className="erro">{errors.username.message}</p>}

        <label htmlFor="email">Email:</label>
        <input 
          id="email" 
          type="email" 
          {...register("email")} 
          aria-invalid={errors.email ? "true" : "false"} 
          aria-describedby={errors.email ? "email-erro" : undefined}
        />
        {errors.email && <p id="email-erro" className="erro">{errors.email.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}
