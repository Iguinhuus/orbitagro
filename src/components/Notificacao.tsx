import { useApp } from "../contexts/AppContext";

export default function Notificacao() {
  const { notificacao, limparNotificacao } = useApp();

  if (!notificacao) return null;

  const cores = {
    sucesso: "from-terra-500 to-green-600 border-terra-400/30",
    erro: "from-danger-500 to-red-700 border-danger-400/30",
    info: "from-astro-500 to-indigo-700 border-astro-400/30",
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-left">
      <div
        className={`bg-gradient-to-r ${cores[notificacao.tipo]} border backdrop-blur-xl rounded-xl px-5 py-3 shadow-2xl flex items-center gap-3 max-w-sm`}
      >
        <span className="text-white text-sm font-medium flex-1">
          {notificacao.mensagem}
        </span>
        <button
          onClick={limparNotificacao}
          className="text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
