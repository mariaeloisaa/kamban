import { Tarefa } from "./tarefa";
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, titulo, status, tarefas, setTarefas }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section
      className="coluna"
      ref={setNodeRef}
      aria-labelledby={`coluna-${status}-titulo`}
      role="region"
    >
      <h2 id={`coluna-${status}-titulo`} className="sub-titulo">
        {titulo}
      </h2>
      <Tarefa
        filtroStatus={status}
        tarefas={tarefas}
        setTarefas={setTarefas}
        aria-label={`Lista de tarefas da coluna ${titulo}`}
      />
    </section>
  );
}
