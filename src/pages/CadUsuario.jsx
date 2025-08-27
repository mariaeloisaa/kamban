export function CadUsuario(){
    return(
        <form className="formulario">
            <h2 className="titulo">Cadastro de Usuário</h2>
            <label>Nome:</label>
            <input type="text" required/>

            <label>Email:</label>
            <input type="email" required/>

            <button type="submit">Cadastrar</button>

        </form>
    )
}