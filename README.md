# CharBuy - Divisas Globales 🌎

**CharBuy** es una herramienta financiera avanzada diseñada para la conversión de divisas en tiempo real con una interfaz optimizada para dispositivos móviles (PWA).

## ✨ Características principales
- **Conversión Cruzada:** Permite calcular valores entre USD, VES, USDT y EUR con precisión decimal y formato adaptado.
- **Tasas en Tiempo Real:** Sincronización automática con mercados globales vía API (ExchangeRate-API) y monitoreo de criptoactivos en vivo mediante Binance WebSocket.
- **Indicadores Visuales:** Sistema de luces LED (verde/rojo) que indica la tendencia alcista o bajista del mercado en tiempo real.
- **Modo Offline:** Gracias al Service Worker (`sw.js`) integrado, la aplicación permite consultar las últimas tasas guardadas en caché sin necesidad de conexión a internet.
- **Monetización Integrada:** Configuración optimizada para Google AdSense con soporte completo de archivo `ads.txt` para vendedores autorizados.

## 🛠️ Tecnologías utilizadas
- **HTML5 / CSS3:** Diseño responsivo con estética "Dark Mode", degradados radiales y tipografía optimizada (Google Fonts - Poppins).
- **JavaScript Vanilla:** Lógica de conversión, integración de WebSockets para datos en vivo y registro de PWA.
- **APIs Financieras:** Sincronización con ExchangeRate-API y Stream de datos de Binance.
- **Google AdSense:** Implementación de anuncios nativos para la generación de ingresos.

## 📁 Estructura del Proyecto
- `index.html`: Núcleo de la aplicación, interfaz de usuario y lógica de cálculo.
- `sw.js`: Service Worker para la gestión de caché, persistencia de datos y funcionamiento offline.
- `manifest.json`: Archivo de configuración para la instalación nativa en dispositivos Android e iOS.
- `sitemap.xml`: Mapa del sitio optimizado para la indexación en motores de búsqueda.
- `ads.txt`: Validación de seguridad y autorización para la red de anuncios de Google.

## 🚀 Despliegue
Este proyecto está optimizado para ser desplegado en plataformas como **Vercel** o **Netlify**, garantizando una conexión segura vía HTTPS, requisito indispensable para el funcionamiento de los Service Workers y la validación de AdSense.





