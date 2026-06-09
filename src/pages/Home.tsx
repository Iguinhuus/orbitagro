import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-astro-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-terra-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-astro-500/5 rounded-full blur-3xl" />
        </div>

        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-astro-500/10 border border-astro-500/20 text-astro-300 text-xs font-medium mb-6">
              <span className="w-2 h-2 bg-terra-400 rounded-full animate-pulse" />
              Global Solution 2026/1 — FIAP
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Monitoramento Agrícola{" "}
            <span className="gradient-text">via Satélite</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Conectamos dados orbitais com o agronegócio para otimizar produtividade,
            prever desastres climáticos e impulsionar a agricultura sustentável
            no Brasil.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard" className="gradient-btn text-center w-full sm:w-auto">
              Acessar Dashboard
            </Link>
            <Link to="/sobre" className="gradient-btn-outline text-center w-full sm:w-auto">
              Saiba mais
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              A Nova <span className="gradient-text">Fronteira Agrícola</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Satélites monitoram o clima, orientam o agronegócio e evitam desastres.
              Transformamos essa infraestrutura espacial em soluções reais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {[
              {
                icone: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
                titulo: "Dados Orbitais",
                descricao: "Imagens multiespectrais de satélites Sentinel, Landsat e CBERS para análise de vegetação.",
                cor: "from-astro-500 to-blue-600",
              },
              {
                icone: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                ),
                titulo: "Previsão Climática",
                descricao: "Modelos meteorológicos alimentados por dados satelitais para antecipar riscos.",
                cor: "from-cyan-500 to-blue-500",
              },
              {
                icone: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                titulo: "Análise Inteligente",
                descricao: "Índices NDVI, mapas de calor e dashboards em tempo real para tomada de decisão.",
                cor: "from-terra-500 to-green-600",
              },
              {
                icone: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                  </svg>
                ),
                titulo: "Alertas em Tempo Real",
                descricao: "Sistema de alerta precoce para secas, geadas, incêndios e eventos extremos.",
                cor: "from-solar-500 to-orange-600",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card text-center group animate-fade-in-up">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.cor} flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {item.icone}
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  {item.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ODS */}
      <section className="py-20 px-4 sm:px-6 bg-space-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Conexão com os{" "}
              <span className="gradient-text">ODS da ONU</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Nossa solução contribui diretamente para enfrentar os maiores
              desafios globais da atualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "02", titulo: "Fome Zero", desc: "Agricultura sustentável com dados satelitais para maximizar produção.", cor: "from-yellow-500 to-amber-600" },
              { num: "09", titulo: "Inovação e Infraestrutura", desc: "Tecnologia espacial aplicada ao agronegócio brasileiro.", cor: "from-orange-500 to-red-500" },
              { num: "13", titulo: "Ação Climática", desc: "Previsão e prevenção de desastres com monitoramento orbital.", cor: "from-green-600 to-emerald-700" },
            ].map((ods) => (
              <div key={ods.num} className="glass-card flex items-start gap-4">
                <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${ods.cor} flex items-center justify-center text-white font-bold text-lg`}>
                  {ods.num}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-200 mb-1">
                    {ods.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm">{ods.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pronto para explorar os{" "}
              <span className="gradient-text">dados orbitais</span>?
            </h2>
            <p className="text-gray-400 mb-8">
              Acesse o dashboard e veja em tempo real o monitoramento de culturas
              e alertas climáticos em todo o Brasil.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard" className="gradient-btn w-full sm:w-auto text-center">
                Explorar Dashboard
              </Link>
              <Link to="/culturas" className="gradient-btn-outline w-full sm:w-auto text-center">
                Ver Culturas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
