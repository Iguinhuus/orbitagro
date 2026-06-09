import { useState } from "react";
import type { FAQItem } from "../types";

const faqData: FAQItem[] = [
  {
    id: 1,
    pergunta: "O que é o OrbitAgro?",
    resposta: "O OrbitAgro é uma plataforma de monitoramento agrícola que utiliza dados de satélites para otimizar a produtividade, prever desastres climáticos e apoiar a agricultura sustentável no Brasil. Ele conecta a exploração espacial com problemas reais do agronegócio.",
  },
  {
    id: 2,
    pergunta: "Quais satélites são utilizados para o monitoramento?",
    resposta: "Utilizamos dados de diversos satélites como Sentinel-2 (imagens multiespectrais), Landsat-8 (imagens termais), CBERS-4A (satélite brasileiro), GOES-16 (meteorologia) e VIIRS/MODIS (detecção de focos de calor). Cada satélite contribui com um tipo específico de informação.",
  },
  {
    id: 3,
    pergunta: "O que é o índice NDVI e como ele é usado?",
    resposta: "O NDVI (Normalized Difference Vegetation Index) é um índice que mede a saúde da vegetação a partir de imagens de satélite. Valores entre 0.6 e 1.0 indicam vegetação saudável, enquanto valores abaixo de 0.3 podem indicar estresse hídrico ou solo exposto. O OrbitAgro utiliza o NDVI para monitorar a saúde das culturas em tempo real.",
  },
  {
    id: 4,
    pergunta: "Como funcionam os alertas climáticos?",
    resposta: "Os alertas são gerados a partir da análise de dados meteorológicos orbitais, incluindo imagens de radar, dados atmosféricos e modelos de previsão. Quando condições adversas são detectadas (seca, geada, chuva intensa, vendaval ou incêndio), o sistema emite alertas classificados por severidade para que os produtores possam tomar medidas preventivas.",
  },
  {
    id: 5,
    pergunta: "Qual a relação do projeto com os ODS da ONU?",
    resposta: "O OrbitAgro contribui para três Objetivos de Desenvolvimento Sustentável: ODS 2 (Fome Zero) ao otimizar a produção agrícola, ODS 9 (Indústria e Inovação) ao aplicar tecnologia espacial no agronegócio, e ODS 13 (Ação Climática) ao prevenir e mitigar os impactos de desastres climáticos na agricultura.",
  },
  {
    id: 6,
    pergunta: "Quais tecnologias foram utilizadas no desenvolvimento?",
    resposta: "O front-end foi desenvolvido com React + Vite + TypeScript, utilizando Tailwind CSS para estilização, React Router para navegação SPA e Fetch API para integração com o backend. O deploy é feito na plataforma Vercel e o versionamento no GitHub.",
  },
  {
    id: 7,
    pergunta: "Este projeto faz parte de qual disciplina?",
    resposta: "O OrbitAgro é o projeto da Global Solution 2026/1 da FIAP, abrangendo a disciplina de Front-End Design Engineering. O tema central é a Economia Espacial, conectando a exploração espacial com problemas e oportunidades reais na Terra.",
  },
];

export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(null);

  const toggle = (id: number) => {
    setAberto(aberto === id ? null : id);
  };

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar-500/10 border border-solar-500/20 text-solar-400 text-xs font-medium mb-4">
            Dúvidas Frequentes
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">FAQ</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Respostas para as perguntas mais comuns sobre o OrbitAgro e o desafio da Global Solution.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item) => (
            <div key={item.id} className="glass overflow-hidden animate-fade-in-up">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-white/5 transition-colors"
              >
                <span className="text-gray-200 font-medium pr-4">{item.pergunta}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${aberto === item.id ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${aberto === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
