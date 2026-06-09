interface ErrorMessageProps {
  titulo?: string;
  mensagem: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ titulo = "Ops! Algo deu errado", mensagem, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="glass-card max-w-md w-full text-center">
        {/* Ícone de erro */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-200 mb-2">{titulo}</h3>
        <p className="text-gray-400 text-sm mb-6">{mensagem}</p>
        
        {onRetry && (
          <button onClick={onRetry} className="gradient-btn text-sm">
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}
