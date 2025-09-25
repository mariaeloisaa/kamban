import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";

function TarefaItem({ tarefa, editarTarefa, excluirTarefa, statusSelecionado, setStatusSelecionado, alterarStatus }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      key={tarefa.id}
      className="tarefa-item"
      ref={setNodeRef}
      style={style}
      aria-label={`Tarefa ${tarefa.descricao}`}
    >
      {/* handle de drag separado */}
      <div
        className="drag-handle"
        {...listeners}
        {...attributes}
        aria-label="Arrastar tarefa"
        style={{ cursor: "grab", marginBottom: "6px" }}
      >
        ⠿
      </div>

      <p><strong>Descrição:</strong> {tarefa.descricao}</p>
      <p><strong>Setor:</strong> {tarefa.setor}</p>
      <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
      <p><strong>Vinculado a:</strong> {tarefa.usuario_nome}</p>

      <div className="acoes">
        <button
          className="btn editar"
          onClick={(e) => {
            e.stopPropagation();
            editarTarefa(tarefa.id);
          }}
        >
          Editar
        </button>
        <button
          className="btn excluir"
          onClick={(e) => {
            e.stopPropagation();
            excluirTarefa(tarefa.id);
          }}
        >
          Excluir
        </button>
      </div>

      <div className="status">
        <select
          value={statusSelecionado[tarefa.id] || tarefa.status}
          onChange={(e) =>
            setStatusSelecionado({ ...statusSelecionado, [tarefa.id]: e.target.value })
          }
        >
          <option value="a_fazer">A Fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="pronto">Pronto</option>
        </select>
        <button
          className="btn alterar"
          onClick={(e) => {
            e.stopPropagation();
            alterarStatus(tarefa.id);
          }}
        >
          Alterar Status
        </button>
      </div>
    </div>
  );
}

export function Tarefa({ filtroStatus, tarefas, setTarefas }) {
  const [statusSelecionado, setStatusSelecionado] = useState({});
  const navigate = useNavigate();

  async function excluirTarefa(id) {
    if (window.confirm("Deseja realmente excluir essa tarefa?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/tarefa/${id}/`);
        setTarefas(tarefas.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  }

  function editarTarefa(id) {
    navigate(`/cadTarefa/${id}`);
  }

  async function alterarStatus(id) {
    try {
      await axios.patch(`http://127.0.0.1:8000/tarefa/${id}/`, {
        status: statusSelecionado[id],
      });
      setTarefas((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: statusSelecionado[id] } : t
        )
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  }

  const filtradas = tarefas.filter((t) => t.status === filtroStatus);

  return (
    <section className="tarefa" aria-label={`Lista de tarefas da coluna ${filtroStatus}`}>
      {filtradas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        filtradas.map((t) => (
          <TarefaItem
            key={t.id}
            tarefa={t}
            editarTarefa={editarTarefa}
            excluirTarefa={excluirTarefa}
            statusSelecionado={statusSelecionado}
            setStatusSelecionado={setStatusSelecionado}
            alterarStatus={alterarStatus}
          />
        ))
      )}
    </section>
  );
}
