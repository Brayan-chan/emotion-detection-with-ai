export default function Footer() {
  return (
    <footer className="border-t border-blue-500/20 bg-slate-950/50 backdrop-blur-sm mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">¿Cómo funciona?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Utilizamos face-api.js, una librería de IA visual que detecta rostros y analiza expresiones faciales
              usando redes neuronales entrenadas.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Emociones Detectadas</h3>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>😊 Feliz</li>
              <li>😢 Triste</li>
              <li>😲 Sorprendido</li>
              <li>😠 Enojado</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Privacidad</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Todo el análisis ocurre en tu navegador. No se envían imágenes a servidores externos.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
          <p>Construido con Next.js, TailwindCSS y face-api.js • Educación en IA Visual</p>
        </div>
      </div>
    </footer>
  )
}
