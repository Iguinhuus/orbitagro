import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-space-900/50 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-astro-500 to-terra-500 flex items-center justify-center text-white font-bold text-sm">
                OA
              </div>
              <span className="text-lg font-bold gradient-text">OrbitAgro</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Conectando a exploração espacial com a agricultura terrestre
              para um futuro mais sustentável e produtivo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/sobre", label: "Sobre" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/culturas", label: "Culturas" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 hover:text-astro-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mais Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Projeto
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/alertas", label: "Alertas" },
                { to: "/integrantes", label: "Equipe" },
                { to: "/faq", label: "FAQ" },
                { to: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 hover:text-astro-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fontes */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Referências
            </h4>
            <ul className="space-y-2">
              {[
                { href: "https://www.nasa.gov", label: "NASA" },
                { href: "https://www.esa.int", label: "ESA" },
                { href: "https://disasterscharter.org", label: "Space Charter" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-terra-400 text-sm transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 OrbitAgro — Global Solution FIAP. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-xs">
              React + Vite + TypeScript + Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
