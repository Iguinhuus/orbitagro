import { Link, useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/sobre", label: "Sobre" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/culturas", label: "Culturas" },
  { path: "/alertas", label: "Alertas" },
  { path: "/integrantes", label: "Equipe" },
  { path: "/faq", label: "FAQ" },
  { path: "/contato", label: "Contato" },
];

export default function Header() {
  const { menuAberto, toggleMenu, fecharMenu } = useApp();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={fecharMenu}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-astro-500 to-terra-500 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
              OA
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:inline">
              OrbitAgro
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-astro-500/20 text-astro-300"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuAberto ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuAberto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                menuAberto ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuAberto ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 space-y-1 bg-space-950/95 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={fecharMenu}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-astro-500/20 text-astro-300"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
