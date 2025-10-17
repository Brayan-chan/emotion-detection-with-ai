"use client"

import { useEffect, useState } from "react"
import * as faceapi from "@vladmandic/face-api"
import EmotionDetector from "@/components/emotion-detector"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/"
        await faceapi.nets.tinyFaceDetector.load(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.load(MODEL_URL)
        await faceapi.nets.faceExpressionNet.load(MODEL_URL)
        setModelsLoaded(true)
      } catch (error) {
        console.error("Error loading models:", error)
      } finally {
        setLoading(false)
      }
    }

    loadModels()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando modelos de IA...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {modelsLoaded ? (
          <EmotionDetector />
        ) : (
          <div className="text-white text-center">
            <p>Error al cargar los modelos. Por favor, recarga la página.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
