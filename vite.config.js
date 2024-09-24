import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Permite acceso desde cualquier dispositivo en la red
        hmr: {
            host: '192.168.1.50', // La IP de tu computadora
        }
    },
});
