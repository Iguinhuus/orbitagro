export default function Loading({ mensagem = "Carregando dados..." }: { mensagem?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        {/* Órbita externa */}
        <div className="absolute inset-0 border-2 border-astro-500/20 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
        {/* Órbita interna */}
        <div className="absolute inset-2 border-2 border-terra-500/30 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        {/* Núcleo */}
        <div className="absolute inset-5 bg-gradient-to-br from-astro-500 to-terra-500 rounded-full animate-pulse" />
        {/* Satélite */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-astro-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', transformOrigin: '0 32px' }} />
      </div>
      <p className="text-gray-400 text-sm animate-pulse">{mensagem}</p>
    </div>
  );
}
