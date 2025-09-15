import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        name: 'Informations personnelles',
        short_name: 'InfoPerso',
        description: 'Application de gestion et de partage de ses données personnels',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      registerType: 'autoUpdate',
    })
  ],

  preview: {
    allowedHosts: [
      '54d8-2a01-e0a-17e-eb90-512e-5b1e-6d5c-1f47.ngrok-free.app',
    ]
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '54d8-2a01-e0a-17e-eb90-512e-5b1e-6d5c-1f47.ngrok-free.app',
    ]
  }
})
