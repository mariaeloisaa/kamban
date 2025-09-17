import { Link } from 'react-router-dom';

export function BarraNavegacao() {
  return (
    <nav className="barra" aria-label="Barra de navegação principal">
      <ul>
        <li>
          <Link to="/cadUsuario" aria-label="Ir para Cadastro de Usuário">
            Cadastro de Usuário
          </Link>
        </li>
        <li>
          <Link to="/cadTarefa" aria-label="Ir para Cadastro de Tarefas">
            Cadastro de Tarefas
          </Link>
        </li>
        <li>
          <Link to="/" aria-label="Ir para Gerenciamento de Tarefas">
            Gerenciamento de Tarefas
          </Link>
        </li>
      </ul>
    </nav>
  );
}
