# Flashly · Guion de locución · Comercial v4 (30 s, 16:9)

Guion de voz en off para el video `Flashly_Comercial_16x9_v4.mp4`, escrito para generarse con IA (TTS). La voz **complementa** los rótulos en pantalla: no los lee palabra por palabra, pero usa las mismas palabras clave para que lo que se oye y lo que se lee coincidan.

Versión fusionada Claude × ChatGPT: estructura, tiempos y diferenciador de Claude; dirección de voz, pronunciación y dos líneas de ChatGPT.

---

## 1. Resumen

| Dato | Valor |
|---|---|
| Duración del video | 30 s |
| Clips de voz | 9 |
| Palabras | 61 (≈ 23.5 s de voz a 2.6 palabras/s; cada clip cabe en su ventana) |
| Silencios obligatorios (efectos de sonido) | 2.9–3.3 s (aviso) · 13.4–13.8 s (disparo) · 16.9–17.4 s (desbloqueo) |
| Idea que siembra la voz y no está en pantalla | «Todo tu campus. No solo tus amigos.» |

---

## 2. Dirección de voz

- **Perfil:** adulto joven de 20 a 26 años, español mexicano neutro, registro medio, con una sonrisa discreta en la voz.
- **Actitud:** alguien del campus que te cuenta algo que le gusta. Nada de voz de tráiler, entusiasmo exagerado ni cantadito comercial.
- **Energía:** 6/10 en general; sube a 7/10 en los clips 6 y 9.
- **Ritmo:** unas 156 palabras por minuto, con pausas breves entre frases.
- **Énfasis suave en:** «hora sorpresa», «todo tu campus», «a la vez», «dos minutos», «no solo tus amigos».
- **Cierre:** seguro y cálido, sin subir el volumen.

**Ajustes iniciales para ElevenLabs (Multilingual v2):** estabilidad 50 %, similitud 75 %, estilo 0 %, velocidad 1.0. Son un punto de partida: ajústalos después de escuchar la primera toma.

**Cómo generar:** cada clip por separado, con la misma voz y los mismos ajustes. Los silencios se colocan al editar, no con la puntuación.

---

## 3. Guion con tiempos

| # | Entra en | Ventana | Lo que se ve | Rótulo en pantalla | **Voz** | Palabras | Intención |
|---|---|---|---|---|---|---|---|
| 1 | 0.2 s | 0.2–2.8 s | Seis lugares del campus y el reloj 13:46 → 13:47 | Una vez al día, a una hora sorpresa… | **Cada día, a una hora sorpresa…** | 6 | Curiosidad; deja la frase abierta |
| — | — | 2.9–3.3 s | Cae «¡Es ahora! ⚡» en las seis escenas | — | *(silencio: suena el aviso)* | — | — |
| 2 | 3.4 s | 3.4–7.0 s | El mismo aviso en todas | ① Todo tu campus recibe el mismo aviso. | **…todo tu campus recibe el aviso. A la vez.** | 9 | Revelación; marca «a la vez» |
| 3 | 7.6 s | 7.6–10.9 s | Teléfono, anillo ámbar 2:00 | ② Tienes 2 minutos para tu foto. | **Tienes dos minutos. Captura lo que estás viviendo.** | 8 | Invitación espontánea, sin presión |
| 4 | 11.1 s | 11.1–13.3 s | Etiquetas Trasera / Frontal | Trasera y frontal, en una sola foto. | **Las dos cámaras, tal cual.** | 5 | Ligera, con sonrisa |
| — | — | 13.4–13.8 s | Disparo | — | *(silencio: suena la cámara)* | — | — |
| 5 | 13.9 s | 13.9–16.8 s | «Publicar» y fotos ajenas con candado | ③ Publica el tuyo… | **Publica el tuyo y desbloquea los demás.** | 7 | Anticipación |
| — | — | 16.9–17.4 s | Toque y desbloqueo | — | *(silencio: suena el desbloqueo)* | — | — |
| 6 | 17.5 s | 17.5–20.6 s | Mosaico con nombres y lugares | …y descubre los de todo tu campus. | **Todo tu campus. No solo tus amigos.** | 7 | Apertura; el diferenciador |
| 7 | 21.0 s | 21.0–23.4 s | Foto con chip «Tarde» | ¿Llegas tarde? Igual puedes publicar. | **¿Vas tarde? Todavía puedes sumarte.** | 5 | Tranquilidad; bienvenida |
| 8 | 23.6 s | 23.6–25.9 s | Anillo «24 h» | Visibles solo durante 24 horas. | **Veinticuatro horas. Mañana, otro aviso.** | 5 | Urgencia suave y promesa de volver |
| 9 | 26.3 s | 26.3–29.7 s | Logo, lema, resumen, «Primero en la UTSV · Android» | Flashly · Haz que tu campus pase. | **Flashly. Haz que tu campus pase. Descárgala en Android.** | 9 | Marca clara; invitación directa |

---

## 4. Texto listo para pegar en el generador de voz

Pega **solo** la línea de cada clip. Los tiempos y las notas van fuera del texto hablado. Para que el TTS no pronuncie mal, los números y las siglas ya van escritos con letra.

```text
01 → Cada día, a una hora sorpresa…
02 → …todo tu campus recibe el aviso. A la vez.
03 → Tienes dos minutos. Captura lo que estás viviendo.
04 → Las dos cámaras, tal cual.
05 → Publica el tuyo y desbloquea los demás.
06 → Todo tu campus. No solo tus amigos.
07 → ¿Vas tarde? Todavía puedes sumarte.
08 → Veinticuatro horas. Mañana, otro aviso.
09 → Fláshli. Haz que tu campus pase. Descárgala en Android.
```

En el clip 09, «Fláshli» es solo para el generador; en pantalla se mantiene «Flashly».

**Nombres de archivo sugeridos:** `vo_01.mp3` … `vo_09.mp3`. Con esos nombres puedo integrarlos al video en sus tiempos exactos.

---

### 4b. Versión en un solo audio (ElevenLabs Multilingual v2)

Las etiquetas `<break>` crean pausas medidas para seguir el ritmo del video. Además, sirven para cortar el audio después y colocar cada frase en su segundo exacto.

```text
Cada día, a una hora sorpresa... <break time="0.9s" /> todo tu campus recibe el aviso. A la vez. <break time="0.8s" /> Tienes dos minutos. Captura lo que estás viviendo. <break time="0.6s" /> Las dos cámaras, tal cual. <break time="0.9s" /> Publica el tuyo y desbloquea los demás. <break time="0.9s" /> Todo tu campus. No solo tus amigos. <break time="0.8s" /> ¿Vas tarde? Todavía puedes sumarte. <break time="0.8s" /> Veinticuatro horas. Mañana, otro aviso. <break time="0.8s" /> Fláshli. <break time="0.3s" /> Haz que tu campus pase. <break time="0.2s" /> Descárgala en Android.
```

Si usas un modelo que lee las etiquetas en voz alta o las ignora (por ejemplo, Eleven v3), usa esta versión sin etiquetas:

```text
Cada día, a una hora sorpresa...

Todo tu campus recibe el aviso. A la vez.

Tienes dos minutos. Captura lo que estás viviendo.

Las dos cámaras, tal cual.

Publica el tuyo y desbloquea los demás.

Todo tu campus. No solo tus amigos.

¿Vas tarde? Todavía puedes sumarte.

Veinticuatro horas. Mañana, otro aviso.

Fláshli. Haz que tu campus pase. Descárgala en Android.
```

Duración esperada del audio completo: 29–31 s. Si pasa de 32 s, sube la velocidad a 1.05. Guárdalo como `vo_completo.mp3`.

## 5. Pronunciación (riesgos del TTS)

| Texto | Riesgo | Cómo escribirlo para el TTS |
|---|---|---|
| Flashly | Acento raro o lectura en inglés | `Fláshli` (se oye «FLÁSH-li») |
| UTSV | Lectura como palabra o letras en inglés | La voz no la menciona. Si la agregas: `u, te, ese, uve` |
| 2:00 / 2 min | Lectura como hora | `dos minutos` |
| 24 h | Lectura de la «h» | `veinticuatro horas` |
| Android | Pronunciación en inglés | `Android`; si falla, prueba `Andróid` |
| Puntos suspensivos (clips 1 y 2) | Pausa demasiado larga o tono de pregunta | Si suena raro, cámbialos por coma |

---

## 6. Alternativas

| Clip | Alternativa | Palabras | Cuándo usarla |
|---|---|---|---|
| 1 | Tu campus tiene algo que contar. | 6 | Gancho más emocional; la «hora sorpresa» queda solo en pantalla |
| 1 | Lo inesperado también pasa entre clases. | 6 | Tono más poético |
| 6 | Descubre qué pasa en todo tu campus. | 7 | Si prefieres no compararte con otras apps |
| 9 | Fláshli. Todo tu campus, más cerca. Descárgala en Android. | 9 | Si cambias el lema |
| 9 | Fláshli. Haz que tu campus pase. Búscala como Fláshli en Android. | 11 | Cuando haya enlace o QR real (requiere 4.2 s; acortar el cierre visual) |

---

## 7. Mezcla al integrar

- **Música:** bajarla unos 8 dB mientras habla la voz, con una subida suave de 150 ms al terminar cada clip.
- **Efectos:** el aviso, el disparo y el desbloqueo no se bajan; para eso están los silencios de la voz.
- **Volumen:** la voz pico a unos −6 dBFS; la mezcla final cerca de −14 LUFS para redes.
- **Comprobación:** escuchar en la bocina del celular. Si no se entiende una palabra, se reescribe; no se sube la voz.
