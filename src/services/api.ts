import type {
  Cultura,
  CulturaInput,
  Alerta,
  ContatoForm,
  ApiResponse,
} from "../types";

// URL base da API — em desenvolvimento aponta para json-server local
// Em produção, aponta para a API publicada no Render
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

// ============================
// Função genérica de requisição com fetch
// ============================

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ${response.status}: ${errorText || response.statusText}`
      );
    }

    // DELETE retorna corpo vazio em json-server
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return { data: null as T, status: response.status, message: "Sucesso" };
    }

    const data: T = await response.json();
    return { data, status: response.status, message: "Sucesso" };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Erro de conexão: não foi possível conectar ao servidor. Verifique se a API está rodando."
      );
    }
    throw error;
  }
}

// ============================
// CRUD — Culturas
// ============================

export async function getCulturas(): Promise<ApiResponse<Cultura[]>> {
  return request<Cultura[]>("/culturas");
}

export async function getCulturaById(
  id: number
): Promise<ApiResponse<Cultura>> {
  return request<Cultura>(`/culturas/${id}`);
}

export async function createCultura(
  input: CulturaInput
): Promise<ApiResponse<Cultura>> {
  return request<Cultura>("/culturas", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateCultura(
  id: number,
  input: CulturaInput
): Promise<ApiResponse<Cultura>> {
  return request<Cultura>(`/culturas/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteCultura(
  id: number
): Promise<ApiResponse<null>> {
  return request<null>(`/culturas/${id}`, { method: "DELETE" });
}

// ============================
// CRUD — Alertas
// ============================

export async function getAlertas(): Promise<ApiResponse<Alerta[]>> {
  return request<Alerta[]>("/alertas");
}

export async function getAlertaById(
  id: number
): Promise<ApiResponse<Alerta>> {
  return request<Alerta>(`/alertas/${id}`);
}

// ============================
// Contato
// ============================

export async function enviarContato(
  dados: ContatoForm
): Promise<ApiResponse<{ id: number }>> {
  return request<{ id: number }>("/contatos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}
