import type { Integrante } from "../types";

const integrantes: Integrante[] = [
  {
    nome: "Igor Mendes Oviedo",
    rm: "553434",
    turma: "1TDSPS-2025",
    foto: "",
    github: "https://github.com/Iguinhuus",
    linkedin: "https://www.linkedin.com/in/igor-mendes-oviedo-27aabb202/",
    descricao: "Desenvolvedor Front-End responsável pela arquitetura da aplicação, integração com API e design da interface.",
  },
];

export default function Integrantes() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terra-500/10 border border-terra-500/20 text-terra-300 text-xs font-medium mb-4">
            Nossa Equipe
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Integrantes</span> do Projeto
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Conheça quem está por trás do OrbitAgro — Global Solution FIAP 2026/1.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {integrantes.map((membro) => (
            <div key={membro.rm} className="glass-card text-center w-full max-w-sm animate-fade-in-up group">
              {/* Foto / Avatar */}
              <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-astro-500 to-terra-500 p-0.5 transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center overflow-hidden">
                  {membro.foto ? (
                    <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold gradient-text">
                      {membro.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-gray-200 mb-1">{membro.nome}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-astro-500/20 text-astro-300">
                  RM {membro.rm}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-terra-500/20 text-terra-300">
                  {membro.turma}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{membro.descricao}</p>

              {/* Links */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href={membro.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={membro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm hover:bg-blue-600/20 hover:text-blue-300 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
