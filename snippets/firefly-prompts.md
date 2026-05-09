# Prompts probados para Adobe Firefly Video

## Para PRODUCTOS (joyería, perfumería)

### Diamante / piedra preciosa rotando
```
Black diamond brilliant cut, slowly rotating 360 degrees in space, dramatic golden studio lighting reflecting on polished facets, subtle rainbow iridescence, golden dust particles drifting around it, isolated on pure black seamless background, hyperrealistic 8k jewelry photography, smooth continuous slow rotation, cinematic depth of field, 6 seconds
```

### Frasco de perfume rotando
```
Luxury perfume bottle slowly rotating 360 degrees, glass with golden liquid inside, dramatic studio lighting catching the facets and label, isolated on pure black background, hyperrealistic product photography, smooth rotation, 8 seconds
```

### Frasco con vapor / spray
```
Perfume bottle releasing golden mist from the nozzle in slow motion, magical particle vapor rising upward, cap floating above, isolated on pure black background, cinematic lighting, hyperrealistic, 7 seconds
```

### Anillo / joya con sparkle
```
Gold ring with diamond floating in space, slow rotation revealing all angles, sharp specular highlights twinkling on the diamond as it turns, golden dust particles, isolated on pure black background, hyperrealistic 8k jewelry photography, 6 seconds
```

### Liquid / perfume swirling
```
Macro shot of golden perfume liquid swirling inside a glass bottle, slow motion, dramatic backlight catching the swirl, isolated on black background, hyperrealistic, 8 seconds
```

## Para FONDOS / atmosphere

### Particle field dorado
```
Golden particles slowly drifting in space, soft bokeh, magical atmosphere, isolated on pure black background, seamless loop, 10 seconds
```

### Smoke / mist atmospheric
```
Soft golden mist flowing slowly through dark space, ethereal atmosphere, cinematic lighting, isolated on pure black background, seamless loop, 12 seconds
```

## Reglas para que el video sea usable
1. **Fondo: pure black `#000000`** — para chroma key después
2. **Duración: 5-10 segundos** — suficiente para loop o scroll-scrub
3. **Resolución: 1080p mínimo, 4K si se puede**
4. **Frame rate: 24-30 fps**
5. **Sin objetos extra** — solo el sujeto principal centrado
6. **Iluminación dramática** — mejor un solo key light + rim light
7. **Movimiento suave** — sin cortes, sin saltos

## Después de generar
1. Descarga el MP4
2. Mándamelo (drag al chat o ruta `~/Desktop/`)
3. Yo proceso con ffmpeg para:
   - Quitar fondo negro → WebM con alpha
   - Optimizar tamaño
4. Yo integro con scroll-scrub o como video background
