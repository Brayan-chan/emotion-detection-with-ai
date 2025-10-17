"use client"

import type { RefObject } from "react"
import AILabHUD from "./ai-lab-hud"
import ScanSound from "./scan-sound"

interface CameraFeedProps {
  videoRef: RefObject<HTMLVideoElement>
  canvasRef: RefObject<HTMLCanvasElement>
  cameraActive: boolean
  onStart: () => void
  onStop: () => void
  error: string | null
  emotion: string | null
  confidence: number
}

export default function CameraFeed({
  videoRef,
  canvasRef,
  cameraActive,
  onStart,
  onStop,
  error,
  emotion,
  confidence,
}: CameraFeedProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-slate-950 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
        <div className="aspect-video relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            onLoadedMetadata={() => {
              if (videoRef.current && canvasRef.current) {
                canvasRef.current.width = videoRef.current.videoWidth
                canvasRef.current.height = videoRef.current.videoHeight
              }
            }}
          />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {cameraActive && (
            <>
              <AILabHUD emotion={emotion} confidence={confidence} isScanning={cameraActive} />
              <ScanSound isScanning={cameraActive} emotion={emotion} />
            </>
          )}

          {!cameraActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-cyan-400 text-center text-lg font-mono">
                PRESIONA INICIAR PARA ACTIVAR SISTEMA DE VISIÓN
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm font-mono">
          ERROR: {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onStart}
          disabled={cameraActive}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 font-mono uppercase tracking-wider"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={onStop}
          disabled={!cameraActive}
          className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-cyan-400 font-semibold py-3 px-6 rounded-lg transition-all duration-200 font-mono uppercase tracking-wider border border-cyan-500/30"
        >
          Detener
        </button>
      </div>
    </div>
  )
}
