import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const schemaCadTarefa = z.object({
  descricao: z.string()
    .min(1, "Informe uma descrição")
    .max(254, "Informe no máximo 254 caracteres")
    .regex(
      /[a-zA-Z0-9À-ÿ]/,
      "Descrição inválida. Deve conter pelo menos uma letra ou número"
    ),

  setor: z.string()
    .min(1, "Informe o setor")
    .max(50, "Informe um setor de no máximo 50 caracteres")
    .regex(
      /^(?![-\s]+$)[a-zA-Z0-9À-ÿ]+(?:[ '-]?[a-zA-Z0-9À-ÿ]+)*$/,
      "Setor inválido. Use letras, números, espaços simples ou hífens entre palavras, sem começar ou terminar com eles"
    ),

  usuario: z.string().min(1, "Selecione o usuário"),
  prioridade: z.string().min(1, "Selecione a prioridade"),
});
export function CadTarefa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schemaCadTarefa),
  });

  const [usuarios, setUsuarios] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/usuario/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }
    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (id) {
      async function carregarTarefa() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/tarefa/${id}/`);
          const tarefa = response.data;
          setValue("descricao", tarefa.descricao);
          setValue("setor", tarefa.setor);
          setValue("usuario", tarefa.usuario.toString());
          setValue("prioridade", tarefa.prioridade);
        } catch (error) {
          console.error("Erro ao carregar tarefa:", error);
        }
      }
      carregarTarefa();
    }
  }, [id, setValue]);

  async function salvarTarefa(data) {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/tarefa/${id}/`, {
          descricao: data.descricao,
          setor: data.setor,
          usuario: parseInt(data.usuario),
          prioridade: data.prioridade,
        });
        alert("Tarefa atualizada com sucesso!");
      } else {
        await axios.post("http://127.0.0.1:8000/tarefas/", {
          descricao: data.descricao,
          setor: data.setor,
          usuario: parseInt(data.usuario),
          prioridade: data.prioridade,
        });
        alert("Tarefa cadastrada com sucesso!");
      }

      reset();
      navigate("/");
    } catch (error) {
      alert("Erro ao salvar tarefa");
      console.error("Erro ao salvar tarefa:", error);
    }
  }

  return (
    <form 
      className="formulario" 
      onSubmit={handleSubmit(salvarTarefa)} 
      aria-label={id ? "Formulário de edição de tarefa" : "Formulário de cadastro de tarefa"}
    >
      <h2 className="titulo">{id ? "Editar Tarefa" : "Cadastro de Tarefa"}</h2>

      <label htmlFor="descricao">Descrição:</label>
      <textarea 
        id="descricao" 
        type="text" 
        {...register("descricao")} 
        aria-invalid={errors.descricao ? "true" : "false"} 
        aria-describedby={errors.descricao ? "descricao-erro" : undefined}
      />
      {errors.descricao && <p id="descricao-erro" style={{ color: "red" }}>{errors.descricao.message}</p>}

      <label htmlFor="setor">Setor:</label>
      <input 
        id="setor" 
        type="text" 
        {...register("setor")} 
        aria-invalid={errors.setor ? "true" : "false"} 
        aria-describedby={errors.setor ? "setor-erro" : undefined}
      />
      {errors.setor && <p id="setor-erro" style={{ color: "red" }}>{errors.setor.message}</p>}

      <label htmlFor="usuario">Usuário:</label>
      <select 
        id="usuario" 
        {...register("usuario")} 
        aria-invalid={errors.usuario ? "true" : "false"} 
        aria-describedby={errors.usuario ? "usuario-erro" : undefined}
      >
        <option value="">Selecione</option>
        {usuarios.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      {errors.usuario && <p id="usuario-erro" style={{ color: "red" }}>{errors.usuario.message}</p>}

      <label htmlFor="prioridade">Prioridade:</label>
      <select 
        id="prioridade" 
        {...register("prioridade")} 
        aria-invalid={errors.prioridade ? "true" : "false"} 
        aria-describedby={errors.prioridade ? "prioridade-erro" : undefined}
      >
        <option value="">Selecione</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>
      {errors.prioridade && <p id="prioridade-erro" style={{ color: "red" }}>{errors.prioridade.message}</p>}

      <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
    </form>
  );
}
