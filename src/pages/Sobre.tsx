export default function Sobre() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-astro-500/10 border border-astro-500/20 text-astro-300 text-xs font-medium mb-4">
            Sobre o Projeto
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            O que é o <span className="gradient-text">OrbitAgro</span>?
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Uma plataforma que conecta a infraestrutura espacial com as necessidades reais da agricultura brasileira.
          </p>
        </div>

        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">🌍 O Problema</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              O Brasil é um dos maiores produtores agrícolas do mundo, mas enfrenta desafios crescentes: mudanças climáticas cada vez mais severas, secas prolongadas, geadas inesperadas e falta de dados precisos para a tomada de decisão no campo.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Pequenos e médios produtores muitas vezes não têm acesso a tecnologias de monitoramento avançadas, perdendo produtividade e enfrentando riscos que poderiam ser mitigados com informações satelitais.
            </p>
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass p-6 sm:p-8 md:p-10 border-astro-500/20">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">🛰️ A Solução</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              O OrbitAgro utiliza dados de satélites como Sentinel-2, Landsat-8, CBERS-4A e GOES-16 para fornecer:
            </p>
            <ul className="space-y-3 text-gray-400">
              {[
                "Monitoramento em tempo real de índices de vegetação (NDVI) e saúde das culturas",
                "Alertas climáticos antecipados baseados em modelos meteorológicos orbitais",
                "Mapeamento de áreas com estresse hídrico por imagens termais",
                "Dashboard interativo com indicadores de produtividade e previsão de safra",
                "Integração de dados espaciais com sensores IoT no campo",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-terra-500/20 flex items-center justify-center mt-0.5">
                    <span className="w-2 h-2 bg-terra-400 rounded-full" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">🔧 Tecnologias Utilizadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { nome: "React", cor: "from-cyan-500 to-blue-500" },
              { nome: "Vite", cor: "from-purple-500 to-indigo-500" },
              { nome: "TypeScript", cor: "from-blue-500 to-blue-700" },
              { nome: "Tailwind", cor: "from-teal-400 to-cyan-500" },
              { nome: "React Router", cor: "from-red-500 to-pink-500" },
              { nome: "Fetch API", cor: "from-amber-500 to-orange-500" },
            ].map((tech) => (
              <div key={tech.nome} className="glass-card text-center py-4">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${tech.cor} flex items-center justify-center text-white text-xs font-bold`}>
                  {tech.nome.charAt(0)}
                </div>
                <span className="text-gray-300 text-sm font-medium">{tech.nome}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass p-6 sm:p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">🚀 O Legado da Corrida Espacial</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Assim como a Revolução Industrial, a eletrificação e a computação transformaram a sociedade, a corrida espacial que levou o ser humano à Lua em 1969 deixou legados que usamos até hoje — do GPS nos nossos celulares à espuma viscoelástica dos colchões.
            </p>
            <p className="text-lg font-semibold gradient-text">
              A próxima corrida tecnológica já começou. E o OrbitAgro faz parte dela.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
