import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getCulturas, createCultura, deleteCultura } from "../services/api";
import { useApp } from "../contexts/AppContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import type { Cultura, CulturaInput, TipoCultura, StatusCultura } from "../types";

const statusCores: Record<string, string> = {
  ativa: "bg-terra-500/20 text-terra-400 border-terra-500/30",
  inativa: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  alerta: "bg-solar-500/20 text-solar-400 border-solar-500/30",
};

const formVazio: CulturaInput = {
  nome: "", tipo: "grãos", area: 0, localizacao: "", status: "ativa",
  coordenadas: { latitude: 0, longitude: 0 }, dataPlantio: "", descricao: "",
};

export default function Culturas() {
  const { mostrarNotificacao } = useApp();
  const { data, loading, error, refetch } = useFetch<Cultura[]>(() => getCulturas(), []);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState<CulturaInput>({ ...formVazio });
  const [salvando, setSalvando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setForm((p) => ({ ...p, coordenadas: { ...p.coordenadas, [name]: parseFloat(value) || 0 } }));
    } else if (name === "area") {
      setForm((p) => ({ ...p, area: parseFloat(value) || 0 }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.localizacao.trim()) {
      mostrarNotificacao("Preencha os campos obrigatórios.", "erro");
      return;
    }
    setSalvando(true);
    try {
      await createCultura(form);
      mostrarNotificacao("Cultura cadastrada com sucesso!", "sucesso");
      setForm({ ...formVazio });
      setMostrarForm(false);
      refetch();
    } catch (err) {
      mostrarNotificacao(err instanceof Error ? err.message : "Erro ao cadastrar.", "erro");
    } finally {
      setSalvando(false);
    }
  };

  const handleDelete = async (id: number, nome: string) => {
    if (!window.confirm(`Tem certeza que deseja remover "${nome}"?`)) return;
    try {
      await deleteCultura(id);
      mostrarNotificacao(`"${nome}" removida com sucesso.`, "sucesso");
      refetch();
    } catch (err) {
      mostrarNotificacao(err instanceof Error ? err.message : "Erro ao remover.", "erro");
    }
  };

  if (loading) return <div className="pt-24"><Loading mensagem="Carregando culturas..." /></div>;
  if (error) return <div className="pt-24"><ErrorMessage mensagem={error} onRetry={refetch} /></div>;

  const culturasFiltradas = filtroStatus === "todos" ? data : data?.filter((c) => c.status === filtroStatus);
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-astro-400 transition-colors";

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold"><span className="gradient-text">Culturas</span> Monitoradas</h1>
            <p className="text-gray-400 mt-1">Gerencie as culturas acompanhadas via satélite.</p>
          </div>
          <button onClick={() => setMostrarForm(!mostrarForm)} className="gradient-btn text-sm whitespace-nowrap">
            {mostrarForm ? "Cancelar" : "+ Nova Cultura"}
          </button>
        </div>

        {/* Form de Cadastro */}
        {mostrarForm && (
          <div className="glass p-6 mb-8 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Cadastrar Nova Cultura</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nome *</label>
                <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Soja Meridional" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange} className={inputCls}>
                  {(["grãos", "frutas", "hortaliças", "leguminosas", "cereais"] as TipoCultura[]).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Área (ha)</label>
                <input name="area" type="number" value={form.area || ""} onChange={handleChange} placeholder="0" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Localização *</label>
                <input name="localizacao" value={form.localizacao} onChange={handleChange} placeholder="Ex: Londrina, PR" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                  {(["ativa", "inativa", "alerta"] as StatusCultura[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Data de Plantio</label>
                <input name="dataPlantio" type="date" value={form.dataPlantio} onChange={handleChange} className={inputCls} />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs text-gray-400 mb-1">Descrição</label>
                <textarea name="descricao" rows={2} value={form.descricao} onChange={handleChange} placeholder="Descreva a cultura..." className={inputCls} />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                <button type="submit" disabled={salvando} className="gradient-btn text-sm disabled:opacity-50">
                  {salvando ? "Salvando..." : "Cadastrar Cultura"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtro */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["todos", "ativa", "inativa", "alerta"].map((s) => (
            <button key={s} onClick={() => setFiltroStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                filtroStatus === s ? "bg-astro-500/20 text-astro-300 border border-astro-500/30" : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
              }`}>
              {s === "todos" ? "Todas" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid de Culturas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {culturasFiltradas?.map((c) => (
            <div key={c.id} className="glass-card group animate-fade-in-up">
              <div className="flex items-start justify-between mb-3">
                <Link to={`/culturas/${c.id}`} className="text-lg font-semibold text-gray-200 hover:text-astro-400 transition-colors">
                  {c.nome}
                </Link>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusCores[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">📍 {c.localizacao}</p>
              <p className="text-gray-500 text-xs mb-3">{c.tipo} · {c.area.toLocaleString("pt-BR")} ha</p>
              <p className="text-gray-400 text-xs line-clamp-2 mb-4">{c.descricao}</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <Link to={`/culturas/${c.id}`} className="text-astro-400 text-xs hover:text-astro-300 transition-colors">
                  Ver detalhes →
                </Link>
                <button onClick={() => handleDelete(c.id, c.nome)} className="text-danger-400/60 text-xs hover:text-danger-400 transition-colors cursor-pointer">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {culturasFiltradas?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhuma cultura encontrada com o filtro selecionado.</p>
          </div>
        )}
      </div>
    </main>
  );
}
