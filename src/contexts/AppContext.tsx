import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AppContextType {
  menuAberto: boolean;
  toggleMenu: () => void;
  fecharMenu: () => void;
  notificacao: { mensagem: string; tipo: "sucesso" | "erro" | "info" } | null;
  mostrarNotificacao: (
    mensagem: string,
    tipo: "sucesso" | "erro" | "info"
  ) => void;
  limparNotificacao: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacao, setNotificacao] = useState<AppContextType["notificacao"]>(null);

  const toggleMenu = () => setMenuAberto((prev) => !prev);
  const fecharMenu = () => setMenuAberto(false);

  const mostrarNotificacao = (
    mensagem: string,
    tipo: "sucesso" | "erro" | "info"
  ) => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 4000);
  };

  const limparNotificacao = () => setNotificacao(null);

  return (
    <AppContext.Provider
      value={{
        menuAberto,
        toggleMenu,
        fecharMenu,
        notificacao,
        mostrarNotificacao,
        limparNotificacao,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
}
