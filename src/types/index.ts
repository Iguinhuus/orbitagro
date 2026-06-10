export type StatusCultura = "ativa" | "inativa" | "alerta";
export type Severidade = "baixa" | "media" | "alta" | "critica";
export type TipoCultura = "grãos" | "frutas" | "hortaliças" | "leguminosas" | "cereais";
export type CategoriaAlerta = "seca" | "geada" | "chuva_intensa" | "vendaval" | "incendio" | "granizo";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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

export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  descricao: string;
}

export interface ContatoForm {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
}

export type CulturaComAlerta = Cultura & {
  alertaAtivo: boolean;
  mensagemAlerta: string;
  severidadeAlerta: Severidade;
};

export type AlertaDetalhado = Alerta & {
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  culturasAfetadas: string[];
  recomendacoes: string[];
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface CardProps {
  titulo: string;
  descricao: string;
  icone?: string;
  className?: string;
  onClick?: () => void;
}

export interface RouteConfig {
  path: string;
  label: string;
  element: React.ReactNode;
  showInNav: boolean;
}
