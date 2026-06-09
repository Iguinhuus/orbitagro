import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Sobre from "../pages/Sobre";
import Integrantes from "../pages/Integrantes";
import FAQ from "../pages/FAQ";
import Contato from "../pages/Contato";
import Dashboard from "../pages/Dashboard";
import Culturas from "../pages/Culturas";
import CulturaDetalhe from "../pages/CulturaDetalhe";
import Alertas from "../pages/Alertas";
import AlertaDetalhe from "../pages/AlertaDetalhe";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Estáticas */}
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/integrantes" element={<Integrantes />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/culturas" element={<Culturas />} />
      <Route path="/alertas" element={<Alertas />} />

      {/* Rotas Dinâmicas com passagem de parâmetros */}
      <Route path="/culturas/:id" element={<CulturaDetalhe />} />
      <Route path="/alertas/:id" element={<AlertaDetalhe />} />

      {/* Redirecionamentos */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/equipe" element={<Navigate to="/integrantes" replace />} />
      <Route path="/team" element={<Navigate to="/integrantes" replace />} />
      <Route path="/about" element={<Navigate to="/sobre" replace />} />
      <Route path="/contact" element={<Navigate to="/contato" replace />} />

      {/* Rota 404 — qualquer rota não mapeada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
