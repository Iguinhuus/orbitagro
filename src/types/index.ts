// ============================
// Tipos Básicos e Union Types
// ============================

/** Status possível de uma cultura monitorada */
export type StatusCultura = "ativa" | "inativa" | "alerta";

/** Nível de severidade de um alerta climático */
export type Severidade = "baixa" | "media" | "alta" | "critica";

/** Tipo de cultura agrícola */
export type TipoCultura = "grãos" | "frutas" | "hortaliças" | "leguminosas" | "cereais";

/** Categoria de alerta climático */
export type CategoriaAlerta = "seca" | "geada" | "chuva_intensa" | "vendaval" | "incendio" | "granizo";

/** Métodos HTTP utilizados na API */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// ============================
// Interfaces
// ============================

/** Representação de uma cultura monitorada pelo sistema */
export interface Cultura {
  id: number;
  nome: string;
  tipo: TipoCultura;
  area: number;
  localizacao: string;
  status: StatusCultura;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  dataPlantio: string;
  ultimaAtualizacao: string;
  descricao: string;
}

/** Dados para criação/edição de cultura (sem id e ultimaAtualizacao) */
export interface CulturaInput {
  nome: string;
  tipo: TipoCultura;
  area: number;
  localizacao: string;
  status: StatusCultura;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  dataPlantio: string;
  descricao: string;
}

/** Representação de um alerta climático */
export interface Alerta {
  id: number;
  titulo: string;
  categoria: CategoriaAlerta;
  severidade: Severidade;
  mensagem: string;
  regiao: string;
  dataEmissao: string;
  ativo: boolean;
}

/** Dados de um integrante da equipe */
export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  descricao: string;
}

/** Dados do formulário de contato */
export interface ContatoForm {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/** Item de FAQ */
export interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
}

// ============================
// Intersection Types
// ============================

/** Cultura com informações de alerta ativo */
export type CulturaComAlerta = Cultura & {
  alertaAtivo: boolean;
  mensagemAlerta: string;
  severidadeAlerta: Severidade;
};

/** Alerta com dados geográficos detalhados */
export type AlertaDetalhado = Alerta & {
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  culturasAfetadas: string[];
  recomendacoes: string[];
};

// ============================
// Tipos Genéricos para API
// ============================

/** Resposta genérica da API */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/** Estado de uma requisição async */
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Props base para componentes de card */
export interface CardProps {
  titulo: string;
  descricao: string;
  icone?: string;
  className?: string;
  onClick?: () => void;
}

/** Configuração de rota da aplicação */
export interface RouteConfig {
  path: string;
  label: string;
  element: React.ReactNode;
  showInNav: boolean;
}
