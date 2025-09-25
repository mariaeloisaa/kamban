import { Coluna } from "./coluna";
import { DndContext } from "@dnd-kit/core";
import axios from "axios";
import { useEffect, useState } from "react";

export function Quadro() {
  const [tarefas, setTarefas] = useState([]);

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

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active) {
      const tarefaId = active.id;
      const novaColuna = over.id;

      setTarefas((prev) =>
        prev.map((t) =>
          t.id === tarefaId ? { ...t, status: novaColuna } : t
        )
      );

      try {
        await axios.patch(`http://127.0.0.1:8000/tarefa/${tarefaId}/`, {
          status: novaColuna,
        });
      } catch (err) {
        console.error("Erro ao movimentar tarefa", err);
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main
        className="quadro"
        role="main"
        aria-label="Quadro de tarefas Kanban"
      >
        <Coluna id="a_fazer" titulo="A Fazer" status="a_fazer" tarefas={tarefas} setTarefas={setTarefas} />
        <Coluna id="fazendo" titulo="Fazendo" status="fazendo" tarefas={tarefas} setTarefas={setTarefas} />
        <Coluna id="pronto" titulo="Pronto" status="pronto" tarefas={tarefas} setTarefas={setTarefas} />
      </main>
    </DndContext>
  );
}
