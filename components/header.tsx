export default function Header() {
  return (
    <header className="border-b border-blue-500/20 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">🤖</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Detector de Emociones
          </h1>
        </div>
        <p className="text-slate-400 text-sm">
          Descubre cómo la inteligencia artificial reconoce emociones en tiempo real
        </p>
      </div>
    </header>
  )
}
