export function CadTarefa(){
    return(
        <form className="formulario">
            <h2 className="titulo">Cadastro de Tarefa</h2>

            <label>Descrição:</label>
            <input type="text" required/>

            <label>Setor:</label>
            <input type="text" required/>

            <label>Usuário:</label>
            <select>
                <option>Gewwww</option>
                <option>Rafaaaaa</option>
                <option>Eloooooo</option>
                <option>Lari Feia</option>
                <option>Debs Feia</option>
            </select>

            <label>Prioridade:</label>
            <select>
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
            </select>

            <button type="submit">Cadastrar</button>

        </form>
    )
}