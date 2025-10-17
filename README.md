# 🤖 Detector de Emociones con IA

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

## 📖 Descripción

Aplicación web interactiva que utiliza inteligencia artificial para detectar y analizar emociones en tiempo real a través de la cámara web. Construida con Next.js 15, React 19 y face-api.js.

### ✨ Características

- 🎭 **Detección de emociones en tiempo real**: Feliz, triste, enojado, sorprendido, disgustado, temeroso y neutral
- 🎨 **Efectos visuales reactivos**: Partículas y fondos que cambian según la emoción detectada
- 🔊 **Retroalimentación por voz**: Mensajes de audio en español que responden a tus emociones
- 📊 **Visualización de datos**: Gráficos de barras con niveles de confianza para cada emoción
- 🔒 **100% privado**: Todo el procesamiento ocurre en tu navegador, sin enviar datos a servidores

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue desde la terminal

1. **Instala Vercel CLI**:
```bash
pnpm install -g vercel
# o
npm install -g vercel
```

2. **Inicia sesión en Vercel**:
```bash
vercel login
```

3. **Despliega la aplicación**:
```bash
# Para preview
vercel

# Para producción
vercel --prod
```

### Opción 2: Despliegue desde GitHub

1. **Sube tu código a GitHub** (si aún no lo has hecho):
```bash
git add .
git commit -m "Preparar para despliegue en Vercel"
git push origin main
```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New..." → "Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración de Next.js
   - Haz clic en "Deploy"

### Opción 3: Botón de despliegue rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Brayan-chan/emotion-detection-with-ai)

## 💻 Desarrollo Local

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

1. **Clona el repositorio**:
```bash
git clone https://github.com/Brayan-chan/emotion-detection-with-ai.git
cd emotion-detection-with-ai
```

2. **Instala las dependencias**:
```bash
pnpm install
# o
npm install
```

3. **Inicia el servidor de desarrollo**:
```bash
pnpm dev
# o
npm run dev
```

4. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
pnpm dev      # Inicia el servidor de desarrollo
pnpm build    # Crea una versión optimizada para producción
pnpm start    # Inicia el servidor de producción
pnpm lint     # Ejecuta el linter
```

## 🛠️ Tecnologías

- **Frontend**: Next.js 15.2, React 19, TypeScript
- **Estilos**: TailwindCSS v4, tw-animate-css
- **IA/ML**: @vladmandic/face-api.js
- **UI Components**: Radix UI
- **Analytics**: Vercel Analytics
- **Gestión de paquetes**: pnpm

## 📁 Estructura del Proyecto

```
emotion-detection-with-ai/
├── app/                      # App Router de Next.js
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/              # Componentes React
│   ├── ai-lab-hud.tsx      # HUD estilo laboratorio
│   ├── camera-feed.tsx     # Feed de la cámara
│   ├── emotion-detector.tsx # Detector principal
│   ├── emotion-display.tsx  # Visualización de emociones
│   ├── emotion-effects.tsx  # Efectos visuales
│   └── emotion-voice.tsx    # Síntesis de voz
├── lib/                     # Utilidades
│   └── utils.ts
├── public/                  # Archivos estáticos
├── next.config.mjs          # Configuración de Next.js
├── vercel.json             # Configuración de Vercel
└── package.json            # Dependencias

```

## 🔒 Privacidad y Seguridad

- ✅ Todo el análisis de IA se ejecuta localmente en el navegador
- ✅ No se almacenan ni transmiten imágenes o videos
- ✅ No se requiere registro ni autenticación
- ✅ Los modelos de IA se cargan desde CDN público

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Brayan Chan**

- GitHub: [@Brayan-chan](https://github.com/Brayan-chan)

## 🙏 Agradecimientos

- [face-api.js](https://github.com/vladmandic/face-api) por la librería de detección facial
- [v0.app](https://v0.app) por el prototipado inicial
- [Vercel](https://vercel.com) por el hosting

---

Construido con ❤️ usando Next.js y face-api.js