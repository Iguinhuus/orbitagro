import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getAlertaById } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import type { Alerta } from "../types";

const severidadeCores: Record<string, string> = {
  baixa: "bg-blue-500/20 text-blue-300",
  media: "bg-solar-500/20 text-solar-400",
  alta: "bg-orange-500/20 text-orange-300",
  critica: "bg-danger-500/20 text-danger-400",
};

const categoriaIcones: Record<string, string> = {
  seca: "☀️",
  geada: "❄️",
  chuva_intensa: "🌧️",
  vendaval: "💨",
  incendio: "🔥",
  granizo: "🧊",
};

const categoriaLabels: Record<string, string> = {
  seca: "Seca",
  geada: "Geada",
  chuva_intensa: "Chuva Intensa",
  vendaval: "Vendaval",
  incendio: "Incêndio",
  granizo: "Granizo",
};

export default function AlertaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alertaId = parseInt(id || "0");

  const { data, loading, error } = useFetch<Alerta>(
    () => getAlertaById(alertaId),
    [alertaId]
  );

  if (loading) return <div className="pt-24"><Loading mensagem="Carregando alerta..." /></div>;
  if (error || !data) return (
    <div className="pt-24">
      <ErrorMessage
        titulo="Alerta não encontrado"
        mensagem={error || `Não foi possível encontrar o alerta com ID ${id}. Verifique se o ID está correto.`}
        onRetry={() => navigate("/alertas")}
      />
    </div>
  );

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 animate-fade-in-up">
          <Link to="/alertas" className="text-gray-500 hover:text-astro-400 transition-colors">
            Alertas
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300 truncate">{data.titulo}</span>
        </div>

        <div className="glass p-6 sm:p-8 animate-fade-in-up">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{categoriaIcones[data.categoria] || "⚠️"}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">
                  {data.titulo}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${severidadeCores[data.severidade]}`}>
                    Severidade: {data.severidade}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.ativo ? "bg-danger-500/20 text-danger-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {data.ativo ? "🔴 Ativo" : "⚪ Encerrado"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Categoria</p>
              <p className="text-gray-200 font-medium text-sm">
                {categoriaLabels[data.categoria] || data.categoria}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Região</p>
              <p className="text-gray-200 font-medium text-sm">{data.regiao}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Data de Emissão</p>
              <p className="text-gray-200 font-medium text-sm">
                {new Date(data.dataEmissao).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Mensagem */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Detalhes do Alerta
            </h3>
            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
              <p className="text-gray-300 text-sm leading-relaxed">
                {data.mensagem}
              </p>
            </div>
          </div>

          {/* Recomendações */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Recomendações
            </h3>
            <ul className="space-y-2">
              {data.severidade === "critica" && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="shrink-0 text-danger-400 mt-0.5">•</span>
                    Acionar planos de contingência imediatamente
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="shrink-0 text-danger-400 mt-0.5">•</span>
                    Comunicar produtores da região afetada
                  </li>
                </>
              )}
              {data.severidade === "alta" && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="shrink-0 text-orange-400 mt-0.5">•</span>
                    Monitorar condições nas próximas 24-48 horas
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="shrink-0 text-orange-400 mt-0.5">•</span>
                    Preparar medidas preventivas para as culturas
                  </li>
                </>
              )}
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="shrink-0 text-terra-400 mt-0.5">•</span>
                Verificar dados atualizados no dashboard de monitoramento
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="shrink-0 text-terra-400 mt-0.5">•</span>
                Consultar fontes oficiais (INMET, Defesa Civil)
              </li>
            </ul>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            <Link to="/alertas" className="gradient-btn-outline text-sm text-center">
              ← Voltar para Alertas
            </Link>
            <Link to="/dashboard" className="gradient-btn text-sm text-center">
              Ver Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
