import { Coluna } from "./coluna";

export function Quadro() {
  return (
    <main 
      className="quadro" 
      role="main" 
      aria-label="Quadro de tarefas Kanban"
    >
      <Coluna titulo="A Fazer" status="a_fazer" />
      <Coluna titulo="Fazendo" status="fazendo" />
      <Coluna titulo="Pronto" status="pronto" />
    </main>
  );
}
