import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getCulturaById, updateCultura, deleteCultura } from "../services/api";
import { useApp } from "../contexts/AppContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import type { Cultura, CulturaInput, TipoCultura, StatusCultura } from "../types";

const statusCores: Record<string, string> = {
  ativa: "bg-terra-500/20 text-terra-400",
  inativa: "bg-gray-500/20 text-gray-400",
  alerta: "bg-solar-500/20 text-solar-400",
};

export default function CulturaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mostrarNotificacao } = useApp();
  const culturaId = parseInt(id || "0");

  const { data, loading, error, refetch } = useFetch<Cultura>(
    () => getCulturaById(culturaId),
    [culturaId]
  );

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<CulturaInput | null>(null);
  const [salvando, setSalvando] = useState(false);

  const iniciarEdicao = () => {
    if (!data) return;
    setForm({
      nome: data.nome, tipo: data.tipo, area: data.area, localizacao: data.localizacao,
      status: data.status, coordenadas: { ...data.coordenadas },
      dataPlantio: data.dataPlantio, descricao: data.descricao,
    });
    setEditando(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    if (name === "area") setForm({ ...form, area: parseFloat(value) || 0 });
    else if (name === "latitude" || name === "longitude") {
      setForm({ ...form, coordenadas: { ...form.coordenadas, [name]: parseFloat(value) || 0 } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const salvar = async () => {
    if (!form) return;
    setSalvando(true);
    try {
      await updateCultura(culturaId, form);
      mostrarNotificacao("Cultura atualizada com sucesso!", "sucesso");
      setEditando(false);
      refetch();
    } catch (err) {
      mostrarNotificacao(err instanceof Error ? err.message : "Erro ao atualizar.", "erro");
    } finally {
      setSalvando(false);
    }
  };

  const remover = async () => {
    if (!data || !window.confirm(`Remover "${data.nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await deleteCultura(culturaId);
      mostrarNotificacao(`"${data.nome}" removida.`, "sucesso");
      navigate("/culturas");
    } catch (err) {
      mostrarNotificacao(err instanceof Error ? err.message : "Erro ao remover.", "erro");
    }
  };

  if (loading) return <div className="pt-24"><Loading mensagem="Carregando cultura..." /></div>;
  if (error || !data) return (
    <div className="pt-24">
      <ErrorMessage
        titulo="Cultura não encontrada"
        mensagem={error || `Não foi possível encontrar a cultura com ID ${id}.`}
        onRetry={() => navigate("/culturas")}
      />
    </div>
  );

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-astro-400 transition-colors";

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 animate-fade-in-up">
          <Link to="/culturas" className="text-gray-500 hover:text-astro-400 transition-colors">Culturas</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">{data.nome}</span>
        </div>

        <div className="glass p-6 sm:p-8 animate-fade-in-up">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">
                  {editando ? "Editar Cultura" : data.nome}
                </h1>
                {!editando && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusCores[data.status]}`}>
                    {data.status}
                  </span>
                )}
              </div>
              {!editando && <p className="text-gray-500 text-sm">📍 {data.localizacao} · {data.tipo} · {data.area.toLocaleString("pt-BR")} ha</p>}
            </div>
            {!editando && (
              <div className="flex gap-2">
                <button onClick={iniciarEdicao} className="gradient-btn-outline text-sm !py-2 !px-4">Editar</button>
                <button onClick={remover} className="border border-danger-500/30 text-danger-400 text-sm py-2 px-4 rounded-xl hover:bg-danger-500/10 transition-colors cursor-pointer">Remover</button>
              </div>
            )}
          </div>

          {editando && form ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Nome</label><input name="nome" value={form.nome} onChange={handleChange} className={inputCls} /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Localização</label><input name="localizacao" value={form.localizacao} onChange={handleChange} className={inputCls} /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Tipo</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange} className={inputCls}>
                    {(["grãos","frutas","hortaliças","leguminosas","cereais"] as TipoCultura[]).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs text-gray-400 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                    {(["ativa","inativa","alerta"] as StatusCultura[]).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs text-gray-400 mb-1">Área (ha)</label><input name="area" type="number" value={form.area || ""} onChange={handleChange} className={inputCls} /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Data de Plantio</label><input name="dataPlantio" type="date" value={form.dataPlantio} onChange={handleChange} className={inputCls} /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Descrição</label><textarea name="descricao" rows={3} value={form.descricao} onChange={handleChange} className={inputCls} /></div>
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={() => setEditando(false)} className="gradient-btn-outline text-sm !py-2 !px-4">Cancelar</button>
                <button onClick={salvar} disabled={salvando} className="gradient-btn text-sm !py-2 !px-4 disabled:opacity-50">
                  {salvando ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Tipo", valor: data.tipo },
                  { label: "Área", valor: `${data.area.toLocaleString("pt-BR")} ha` },
                  { label: "Plantio", valor: new Date(data.dataPlantio).toLocaleDateString("pt-BR") },
                  { label: "Atualização", valor: new Date(data.ultimaAtualizacao).toLocaleDateString("pt-BR") },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                    <p className="text-gray-200 font-medium text-sm">{item.valor}</p>
                  </div>
                ))}
              </div>

              {/* Coordenadas */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-gray-500 text-xs mb-1">Coordenadas</p>
                <p className="text-gray-200 text-sm">
                  Lat: {data.coordenadas.latitude.toFixed(4)} · Lon: {data.coordenadas.longitude.toFixed(4)}
                </p>
              </div>

              {/* Descrição */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Descrição</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{data.descricao}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
