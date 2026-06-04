# Music Playlist App

Aplicación web para crear y gestionar listas de reproducción de música, desarrollada con Angular.

## Demo

[Ver aplicación desplegada](https://TU-URL.vercel.app)

## Credenciales de acceso

- **Usuario:** admin
- **Contraseña:** 1234

## Tecnologías utilizadas

- Angular 19
- Angular Material
- TypeScript
- SCSS
- Deezer API
- Vercel (despliegue)
- Vercel Serverless Functions (proxy CORS)

## Estructura del proyecto

src/app/
├── core/
│   ├── services/
│   │   ├── auth.service.ts        # Autenticación
│   │   ├── playlist.service.ts    # Gestión de playlists
│   │   └── deezer.service.ts      # Integración con Deezer API
│   └── guards/
│       └── auth.guard.ts          # Protección de rutas
├── shared/
│   └── models/
│       ├── playlist.model.ts      # Modelo de playlist
│       └── song.model.ts          # Modelo de canción
└── features/
├── auth/
│   └── login/                 # Pantalla de login
└── playlists/
├── playlist-list/         # Lista de playlists
├── playlist-detail/       # Detalle y reproducción
└── add-song/              # Búsqueda de canciones

## Características

- Inicio y cierre de sesión con validaciones
- Crear y eliminar playlists
- Buscar canciones usando la API de Deezer
- Agregar y eliminar canciones de una playlist
- Reproducir y pausar canciones con preview de 30 segundos
- Datos persistidos en LocalStorage
- Diseño inspirado en Spotify

## Decisiones de diseño

- **Standalone Components**: se usaron componentes standalone de Angular para mejor modularización y reutilización
- **LocalStorage**: se usó para persistir las playlists sin necesidad de un backend
- **Proxy serverless**: se creó una función serverless en Vercel para evitar problemas de CORS con la API de Deezer
- **Angular Material**: se usó para los componentes de UI manteniendo consistencia visual

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/TuUsuario/music-playlist-app.git

# Entrar a la carpeta
cd music-playlist-app/music-app

# Instalar dependencias
npm install

# Correr en desarrollo
ng serve
```

## Autor

Tu Nombre