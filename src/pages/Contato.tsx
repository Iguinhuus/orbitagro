import { useState } from "react";
import type { ContatoForm } from "../types";
import { enviarContato } from "../services/api";
import { useApp } from "../contexts/AppContext";

export default function Contato() {
  const { mostrarNotificacao } = useApp();
  const [form, setForm] = useState<ContatoForm>({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState<Partial<Record<keyof ContatoForm, string>>>({});

  const validar = (): boolean => {
    const novosErros: Partial<Record<keyof ContatoForm, string>> = {};
    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!form.email.trim()) {
      novosErros.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = "E-mail inválido";
    }
    if (!form.assunto.trim()) novosErros.assunto = "Assunto é obrigatório";
    if (!form.mensagem.trim()) novosErros.mensagem = "Mensagem é obrigatória";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name as keyof ContatoForm]) {
      setErros((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    try {
      await enviarContato(form);
      mostrarNotificacao("Mensagem enviada com sucesso! Entraremos em contato em breve.", "sucesso");
      setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar mensagem.";
      mostrarNotificacao(msg, "erro");
    } finally {
      setEnviando(false);
    }
  };

  const inputClass = (campo: keyof ContatoForm) =>
    `w-full bg-white/5 border ${erros[campo] ? "border-danger-400" : "border-white/10"} rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-astro-400 focus:ring-1 focus:ring-astro-400/50 transition-colors`;

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-astro-500/10 border border-astro-500/20 text-astro-300 text-xs font-medium mb-4">
            Fale Conosco
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="gradient-text">Contato</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tem dúvidas, sugestões ou quer saber mais sobre o OrbitAgro? Envie sua mensagem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-5">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1.5">Nome</label>
                <input id="nome" name="nome" type="text" value={form.nome} onChange={handleChange} placeholder="Seu nome completo" className={inputClass("nome")} />
                {erros.nome && <p className="text-danger-400 text-xs mt-1">{erros.nome}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">E-mail</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" className={inputClass("email")} />
                {erros.email && <p className="text-danger-400 text-xs mt-1">{erros.email}</p>}
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-300 mb-1.5">Assunto</label>
                <select id="assunto" name="assunto" value={form.assunto} onChange={handleChange} className={inputClass("assunto")}>
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvida sobre o projeto">Dúvida sobre o projeto</option>
                  <option value="Sugestão de funcionalidade">Sugestão de funcionalidade</option>
                  <option value="Parceria">Parceria</option>
                  <option value="Outro">Outro</option>
                </select>
                {erros.assunto && <p className="text-danger-400 text-xs mt-1">{erros.assunto}</p>}
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-300 mb-1.5">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows={5} value={form.mensagem} onChange={handleChange} placeholder="Escreva sua mensagem..." className={inputClass("mensagem")} />
                {erros.mensagem && <p className="text-danger-400 text-xs mt-1">{erros.mensagem}</p>}
              </div>

              <button type="submit" disabled={enviando} className="gradient-btn w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {enviando ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icone: "📧", titulo: "E-mail", info: "contato@orbitagro.com.br" },
              { icone: "📍", titulo: "Localização", info: "FIAP — São Paulo, SP" },
              { icone: "🕐", titulo: "Horário", info: "Seg-Sex, 9h às 18h" },
            ].map((item) => (
              <div key={item.titulo} className="glass-card flex items-start gap-4">
                <span className="text-2xl">{item.icone}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-300">{item.titulo}</h3>
                  <p className="text-gray-400 text-sm">{item.info}</p>
                </div>
              </div>
            ))}

            <div className="glass-card">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Redes Sociais</h3>
              <div className="flex gap-3">
                <a href="https://github.com/Iguinhuus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/igor-mendes-oviedo-27aabb202/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
