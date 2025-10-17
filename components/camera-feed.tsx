"use client"

import type { RefObject } from "react"

interface CameraFeedProps {
  videoRef: RefObject<HTMLVideoElement>
  canvasRef: RefObject<HTMLCanvasElement>
  cameraActive: boolean
  onStart: () => void
  onStop: () => void
  error: string | null
}

export default function CameraFeed({ videoRef, canvasRef, cameraActive, onStart, onStop, error }: CameraFeedProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-slate-900 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl">
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
          {!cameraActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white text-center text-lg">Presiona el botón para iniciar la cámara</p>
            </div>
          )}
        </div>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={onStart}
          disabled={cameraActive}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={onStop}
          disabled={!cameraActive}
          className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Detener
        </button>
      </div>
    </div>
  )
}
