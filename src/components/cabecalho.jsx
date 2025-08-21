import { BarraNavegacao } from "./navBar";

export function Cabecalho(){
    return(
        <header className="cabecalho">
            <h1 className="titulo">Gerenciamento de Tarefas</h1>
            <BarraNavegacao/>
        </header>


    )
}