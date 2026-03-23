const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir la interfaz del reproductor
app.use(express.static(path.join(__dirname, 'public')));

// El Proxy: Convierte el tráfico de tu IPTV Source a algo que el navegador acepte
app.use('/stream', createProxyMiddleware({
    router: (req) => req.query.url, // Toma la URL del link m3u8 de la consulta
    changeOrigin: true,
    pathRewrite: { '^/stream': '' },
    onProxyRes: (proxyRes) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Bye bye errores de CORS
    }
}));

app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
