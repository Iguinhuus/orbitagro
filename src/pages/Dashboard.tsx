import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getCulturas, getAlertas } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import type { Cultura, Alerta } from "../types";

const severidadeCores: Record<string, string> = {
  baixa: "bg-blue-500/20 text-blue-300",
  media: "bg-solar-500/20 text-solar-400",
  alta: "bg-orange-500/20 text-orange-300",
  critica: "bg-danger-500/20 text-danger-400",
};

const statusCores: Record<string, string> = {
  ativa: "bg-terra-500/20 text-terra-400",
  inativa: "bg-gray-500/20 text-gray-400",
  alerta: "bg-solar-500/20 text-solar-400",
};

export default function Dashboard() {
  const culturas = useFetch<Cultura[]>(() => getCulturas(), []);
  const alertas = useFetch<Alerta[]>(() => getAlertas(), []);

  if (culturas.loading || alertas.loading) return <div className="pt-24"><Loading mensagem="Carregando dashboard..." /></div>;
  if (culturas.error) return <div className="pt-24"><ErrorMessage mensagem={culturas.error} onRetry={culturas.refetch} /></div>;

  const totalCulturas = culturas.data?.length || 0;
  const culturasAtivas = culturas.data?.filter((c) => c.status === "ativa").length || 0;
  const alertasAtivos = alertas.data?.filter((a) => a.ativo).length || 0;
  const areaTotal = culturas.data?.reduce((acc, c) => acc + c.area, 0) || 0;

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400">Painel de monitoramento agrícola em tempo real via satélite.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger-children">
          {[
            { label: "Culturas Monitoradas", valor: totalCulturas, icone: "🌾", cor: "from-terra-500/20 to-green-600/20" },
            { label: "Culturas Ativas", valor: culturasAtivas, icone: "✅", cor: "from-emerald-500/20 to-teal-600/20" },
            { label: "Alertas Ativos", valor: alertasAtivos, icone: "⚠️", cor: "from-solar-500/20 to-orange-600/20" },
            { label: "Área Total (ha)", valor: areaTotal.toLocaleString("pt-BR"), icone: "📐", cor: "from-astro-500/20 to-indigo-600/20" },
          ].map((kpi) => (
            <div key={kpi.label} className="glass-card animate-fade-in-up">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${kpi.cor} flex items-center justify-center text-lg mb-3`}>
                {kpi.icone}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-200">{kpi.valor}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Culturas Recentes */}
          <div className="lg:col-span-2 glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Culturas Recentes</h2>
              <Link to="/culturas" className="text-astro-400 text-sm hover:text-astro-300 transition-colors">
                Ver todas →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-500 font-medium py-3 pr-4">Nome</th>
                    <th className="text-left text-gray-500 font-medium py-3 pr-4 hidden sm:table-cell">Localização</th>
                    <th className="text-left text-gray-500 font-medium py-3 pr-4 hidden md:table-cell">Área (ha)</th>
                    <th className="text-left text-gray-500 font-medium py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {culturas.data?.slice(0, 5).map((c) => (
                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4">
                        <Link to={`/culturas/${c.id}`} className="text-gray-200 hover:text-astro-400 transition-colors font-medium">
                          {c.nome}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-gray-400 hidden sm:table-cell">{c.localizacao}</td>
                      <td className="py-3 pr-4 text-gray-400 hidden md:table-cell">{c.area.toLocaleString("pt-BR")}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusCores[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alertas Recentes */}
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Alertas Recentes</h2>
              <Link to="/alertas" className="text-astro-400 text-sm hover:text-astro-300 transition-colors">
                Ver todos →
              </Link>
            </div>
            <div className="space-y-3">
              {alertas.data?.filter((a) => a.ativo).slice(0, 4).map((a) => (
                <Link key={a.id} to={`/alertas/${a.id}`} className="block p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-200 line-clamp-1">{a.titulo}</h3>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${severidadeCores[a.severidade]}`}>
                      {a.severidade}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{a.regiao}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
