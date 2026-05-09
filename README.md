# Presente — Regala Presente · Demo Page

Landing premium para **Regala Presente** (regalapresente.com), plataforma mexicana de regalos experienciales.

## 🚀 Desarrollo local

```bash
# Servir local
python3 -m http.server 4321
# Abrir http://localhost:4321
```

Sin build step. HTML + CSS + JS vanilla. Todas las dependencias por CDN (GSAP, Lenis).

## 📁 Estructura

```
regala-presente/
├── index.html    ← Estructura + secciones + datos
├── styles.css    ← Sistema de diseño completo
├── script.js     ← Animaciones (cursor, aurora, parallax, scroll)
└── assets/       ← Imágenes locales (placeholder)
```

## 🎨 Sistema de diseño

**Paleta** (CSS variables en `:root` de `styles.css`):
- `--bg` cream cálido `#f5efe2`
- `--ink` deep brown `#2a1a14`
- `--terracotta` accent `#c4633e`
- `--sage` accent secundario `#8a9a7e`
- `--rose` accent suave `#d4a597`

**Tipografía**:
- Display: **Instrument Serif** (italic-friendly)
- Body: **Plus Jakarta Sans**

## ✨ Features

- Cursor líquido con texto contextual ("Regalar →")
- Aurora gradient que sigue al mouse
- 3 cards flotando con parallax + auto-flotación
- Scroll-triggered animations (manifesto reveal, count-up)
- Tilt 3D + spotlight en cards de experiencias
- Marquee infinito de marcas aliadas
- Magnetic buttons
- Mobile-friendly (cursor desactivado, layout adaptado)

## 🚀 Deploy

Conectado a Netlify con auto-deploy desde `main`. Cada push a GitHub → deploy automático.

```bash
# Deploy manual (si hace falta)
netlify deploy --prod --dir=.
```

## 🤝 Colaboración

```bash
git clone https://github.com/Dingler-Dintra/regala-presente.git
cd regala-presente
# editar archivos
git add .
git commit -m "feat: descripción del cambio"
git push origin main
# → auto-deploy
```
