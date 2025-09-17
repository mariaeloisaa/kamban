import { Tarefa } from "./tarefa";

export function Coluna({ titulo, status }) {
  return (
    <section 
      className="coluna" 
      aria-labelledby={`coluna-${status}-titulo`} 
      role="region"
    >
      <h2 
        id={`coluna-${status}-titulo`} 
        className="sub-titulo"
      >
        {titulo}
      </h2>
      <Tarefa filtroStatus={status} aria-label={`Lista de tarefas da coluna ${titulo}`} />
    </section>
  );
}
