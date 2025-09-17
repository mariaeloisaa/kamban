import { BarraNavegacao } from "./navBar";

export function Cabecalho() {
    return (
        <header className="cabecalho" aria-label="Cabeçalho principal">
            <h1 className="titulo">Gerenciamento de Tarefas</h1>
            <BarraNavegacao aria-label="Menu de navegação principal"/>
        </header>
    );
}
