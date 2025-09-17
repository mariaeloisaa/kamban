import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Tarefa({ filtroStatus }) {
  const [tarefas, setTarefas] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState({});
  const navigate = useNavigate();

  // 🔹 Carregar tarefas
  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tarefas/");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }

  // 🔹 Excluir tarefa
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

  // 🔹 Editar tarefa (redireciona com ID)
  function editarTarefa(id) {
    navigate(`/cadTarefa/${id}`);
  }

  // 🔹 Alterar status
  async function alterarStatus(id) {
    try {
      await axios.patch(`http://127.0.0.1:8000/tarefa/${id}/`, {
        status: statusSelecionado[id],
      });
      carregarTarefas();
      window.location.href=window.location.href
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  }

  return (
    <section className="tarefa">
      {tarefas.filter((t) => t.status === filtroStatus).length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tarefas
          .filter((t) => t.status === filtroStatus)
          .map((t) => (
            <div key={t.id} className="tarefa-item">
              <p><strong>Descrição:</strong> {t.descricao}</p>
              <p><strong>Setor:</strong> {t.setor}</p>
              <p><strong>Prioridade:</strong> {t.prioridade}</p>
              <p><strong>Vinculado a:</strong> {t.usuario_nome}</p>

              <div className="acoes">
                <button className="btn editar" onClick={() => editarTarefa(t.id)}>Editar</button>
                <button className="btn excluir" onClick={() => excluirTarefa(t.id)}>Excluir</button>
              </div>

              <div className="status">
                <select
                  value={statusSelecionado[t.id] || t.status}
                  onChange={(e) =>
                    setStatusSelecionado({ ...statusSelecionado, [t.id]: e.target.value })
                  }
                >
                  <option value="a_fazer">A Fazer</option>
                  <option value="fazendo">Fazendo</option>
                  <option value="pronto">Pronto</option>
                </select>
                <button className="btn alterar" onClick={() => alterarStatus(t.id)}>
                  Alterar Status
                </button>
              </div>
            </div>
          ))
      )}
    </section>
  );
}
