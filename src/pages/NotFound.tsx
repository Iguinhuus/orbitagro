import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        {/* Ícone */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-astro-500/10 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-astro-500/20 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold gradient-text">404</span>
          </div>
          {/* Satélite perdido */}
          <div
            className="absolute -top-2 -right-2 w-6 h-6 text-lg animate-spin"
            style={{ animationDuration: "8s" }}
          >
            🛰️
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-3">
          Página não encontrada
        </h1>
        <p className="text-gray-400 mb-2">
          A rota <code className="text-astro-400 bg-astro-500/10 px-2 py-0.5 rounded text-sm">{location.pathname}</code> não existe no sistema.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Parece que nosso satélite perdeu o sinal desta página. Verifique o endereço ou volte para uma área conhecida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="gradient-btn w-full sm:w-auto text-center">
            Voltar para Home
          </Link>
          <Link to="/dashboard" className="gradient-btn-outline w-full sm:w-auto text-center">
            Ir para Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
