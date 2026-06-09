import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getAlertas } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import type { Alerta } from "../types";

const severidadeCores: Record<string, string> = {
  baixa: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  media: "bg-solar-500/20 text-solar-400 border-solar-500/30",
  alta: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  critica: "bg-danger-500/20 text-danger-400 border-danger-500/30",
};

const categoriaIcones: Record<string, string> = {
  seca: "☀️",
  geada: "❄️",
  chuva_intensa: "🌧️",
  vendaval: "💨",
  incendio: "🔥",
  granizo: "🧊",
};

export default function Alertas() {
  const { data, loading, error, refetch } = useFetch<Alerta[]>(() => getAlertas(), []);

  if (loading) return <div className="pt-24"><Loading mensagem="Carregando alertas..." /></div>;
  if (error) return <div className="pt-24"><ErrorMessage mensagem={error} onRetry={refetch} /></div>;

  const alertasAtivos = data?.filter((a) => a.ativo) || [];
  const alertasInativos = data?.filter((a) => !a.ativo) || [];

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Alertas</span> Climáticos
          </h1>
          <p className="text-gray-400">
            Alertas gerados por dados satelitais para prevenção de desastres agrícolas.
          </p>
        </div>

        {/* Alertas Ativos */}
        {alertasAtivos.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-danger-400 rounded-full animate-pulse" />
              Alertas Ativos ({alertasAtivos.length})
            </h2>
            <div className="space-y-4">
              {alertasAtivos.map((a) => (
                <Link key={a.id} to={`/alertas/${a.id}`} className="block glass-card animate-fade-in-up group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoriaIcones[a.categoria] || "⚠️"}</span>
                      <h3 className="text-lg font-semibold text-gray-200 group-hover:text-astro-400 transition-colors">{a.titulo}</h3>
                    </div>
                    <span className={`self-start px-3 py-1 rounded-full text-xs font-medium border ${severidadeCores[a.severidade]}`}>
                      {a.severidade}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2 ml-9 sm:ml-11">{a.mensagem}</p>
                  <div className="flex items-center gap-4 ml-9 sm:ml-11 text-xs text-gray-500">
                    <span>📍 {a.regiao}</span>
                    <span>{new Date(a.dataEmissao).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Alertas Encerrados */}
        {alertasInativos.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-400 mb-4">
              Alertas Encerrados ({alertasInativos.length})
            </h2>
            <div className="space-y-3">
              {alertasInativos.map((a) => (
                <Link key={a.id} to={`/alertas/${a.id}`} className="block glass-card opacity-60 hover:opacity-80 transition-opacity">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{categoriaIcones[a.categoria] || "⚠️"}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-300 truncate">{a.titulo}</h3>
                      <p className="text-xs text-gray-500">{a.regiao} · {new Date(a.dataEmissao).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded-full">encerrado</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
