import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Quadro } from "../components/quadro";
import { CadUsuario } from "../pages/CadUsuario";
import { CadTarefa } from "../pages/CadTarefa";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* Quadro será a tela inicial */}
        <Route index element={<Quadro />} />

        {/* Cadastro de usuário */}
        <Route path="cadUsuario" element={<CadUsuario />} />

        {/* Cadastro de tarefa (novo) */}
        <Route path="cadTarefa" element={<CadTarefa />} />

        {/* Edição de tarefa (com ID) */}
        <Route path="cadTarefa/:id" element={<CadTarefa />} />
      </Route>
    </Routes>
  );
}
