# Flashly · Contexto de los comerciales

Resumen de lo que hemos trabajado en esta sesión sobre el video comercial de Flashly: qué se pidió, qué se produjo, la retroalimentación recibida, la evaluación y los siguientes pasos.

---

## 1. La app en una frase

Flashly es una app social para la UTSV. Una vez al día, a una hora sorpresa, todo el campus recibe el mismo aviso y cada persona tiene 2 minutos para compartir lo que está haciendo con la cámara trasera y la frontal. Para ver los momentos de los demás, primero hay que publicar el tuyo. Los momentos dejan de mostrarse a las 24 horas.

- Lema: **«Haz que tu campus pase.»**
- Colores: violeta `#7C5CFF`, magenta `#C24FE0`, rosa `#FF4F8B` y ámbar `#FFC53D`. El ámbar se reserva para el flash y la ventana activa.
- Tipografía: Inter.
- Distribución actual: APK de Android (EAS). Versión 0.4.0.
- Resumen completo del concepto: `files/Flashly_Concepto.txt`.

---

## 2. Material de partida

En `files/` había tres videos de 60 s, todos verticales a 1080×1920:

- **Flashly_Apple_Claro.mp4** y **Flashly_Apple_Oscuro.mp4**: ilustraciones de personajes y avatares, fondos pastel u oscuros, voz en off y música.
- **Flashly_Pitch_60s.mp4** (dentro de `files.zip`): subtítulos palabra por palabra, rejilla de avatares, reloj, «Sin filtros / Sin poses», «24 H», UTSV y preguntas para comentar.

La petición fue mejorarlos: hacerlos más comerciales, contundentes y atractivos, usando las skills de design-motion, app-store-screenshots, impeccable y banner-design.

---

## 3. Versión 1 · Comercial de 30 s (oscuro neón)

**Decisiones:** 30 s, música nueva sin voz y estilo oscuro neón.
**Archivos:** `files/Flashly_Comercial_30s.mp4` y `files/Flashly_Comercial_30s_fuente.zip`.

| Tiempo | Plano | Texto |
|---|---|---|
| 0–3 s | Rejilla de avatares que se apaga a «?» | «Llevas años en la uni…» / «y no conoces ni a la mitad.» |
| 3–4.6 s | Flash blanco y logo; el ícono viaja a la cabecera | «Flashly · La app que vuelve más social a tu campus.» |
| 4.6–8 s | Lock screen 13:47, notificación «¡Es ahora!» y zoom out a 9 teléfonos | «Un aviso sorpresa al día.» / «Todo el campus. Al mismo tiempo.» |
| 8–11 s | Anillo ámbar de 2:00 | «Tienes 2 minutos.» / «Lo que estés haciendo, tal cual.» |
| 11–15 s | Cámara doble, flash y stickers | «Trasera y frontal, en un solo flash.» · «Sin filtros» · «Sin poses» |
| 15–19 s | Feed bloqueado que se desbloquea | «Si no publicas, no ves.» / «Publicas y lo ves todo.» |
| 19–22 s | «24 h» y polaroids que se disuelven | «y se borra.» |
| 22–25.5 s | Mapa del campus con pines | «Descubre quién anda por el campus.» |
| 25.5–30 s | Cierre | «Flashly · Haz que tu campus pase.» · «Sé el próximo flash» · «Primero en la UTSV» |

**Cómo se hizo:** una página HTML con `render(t)` determinista, capturada cuadro a cuadro con Playwright y codificada con ffmpeg. La música se sintetizó a 120 BPM en Python, con golpes en cada corte, y el audio se normalizó a −14 LUFS.

**Tu reacción:** no te convenció y pediste reimaginarlo por completo.

---

## 4. Versión 2 · Película de producto de 45 s (estilo keynote)

**Decisiones:** concepto de producto héroe, negro cinematográfico, 45 s. No había conector de ChatGPT disponible, así que el concepto se hizo sin él.
**Archivos:** `files/Flashly_Pelicula_45s.mp4` y `files/Flashly_Pelicula_45s_fuente.zip`.

| Tiempo | Plano | Copy |
|---|---|---|
| 0–5 s | Teléfono de canto en la oscuridad; un barrido de luz recorre el vidrio | «Todos los días pasa algo en tu campus. Y casi nunca lo ves.» |
| 5–9.5 s | La pantalla pasa de 13:46 a 13:47 y cae «¡Es ahora!» | Palabra gigante «Ahora.» · «Una vez al día. A una hora sorpresa.» |
| 9.5–14 s | Alejamiento: cientos de teléfonos despiertan en ola | «Todo el campus. Al mismo tiempo.» |
| 14–19 s | Inicio con el anillo de 2:00 | Palabra gigante «2 minutos.» · «Para mostrar lo que de verdad estás haciendo.» |
| 19–25 s | Giro a la espalda, acercamiento a las lentes, flash y vuelta a la cámara doble | «Dos cámaras. Cero filtros.» |
| 25–31 s | Feed desenfocado con «Publica para ver», toque y desbloqueo | «Para ver el de todos, comparte el tuyo.» |
| 31–35.5 s | El teléfono gira de canto y aparece la pantalla de espera | Palabra gigante «24 h» · «Hoy está. Mañana, ya no.» |
| 35.5–40.5 s | Tres teléfonos alineados: Descubrir, Hoy y Chat | «Momentos. Lugares. Personas. Todo tu campus, en una app.» |
| 40.5–45 s | Cierre con ícono y marca | «Flashly · Haz que tu campus pase.» · «Primero en la UTSV» |

**Cómo se hizo:** un teléfono 3D genérico en Three.js, renderizado en Chromium headless. Las pantallas de la app se dibujaron en canvas con el tema oscuro real, el copy va en dos tonos (blanco y gris) y la música es nueva.

**Tu reacción:** te gustó. Después llegó una retroalimentación externa.

---

## 5. Retroalimentación externa recibida

### Diagnóstico

- El comercial base de 30 s comunica mejor. La «Película» es más elegante, pero pierde fuerza comercial, alarga la explicación y da demasiado protagonismo al teléfono.
- Flashly tiene que hacer deseable una experiencia: descubrir qué pasa cerca de ti y formar parte de eso.

### Cambios propuestos

| Lo que se ve | Qué mejorar |
|---|---|
| Los primeros 5 s son un teléfono oscuro girando | Abrir con una situación del campus que despierte curiosidad de inmediato |
| La notificación y el temporizador ocupan del segundo 6 al 19 | Resolverlo en unos 5 s: llega el aviso, aparece «2:00», alguien toma su foto |
| La parte trasera del teléfono presenta «Dos cámaras» | Mostrar directamente la captura frontal y trasera |
| Avatares e ilustraciones | Estudiantes, lugares y momentos creíbles: una reta, una mesa de cafetería, un proyecto en el laboratorio |
| Demasiadas funciones juntas | Priorizar tres acciones: recibe el aviso, comparte, descubre tu campus |
| El cierre no tiene llamada a la acción | Cerrar con una acción concreta y un destino real |

Además:

- «Si no publicas, no ves» presenta la restricción antes que la recompensa. Conviene mostrar primero lo que descubres.
- «Estilo Apple, Google, Microsoft y Samsung» deja demasiado abierto. La propuesta es concretarlo así: fotografía natural, composición limpia, interfaz precisa y una pequeña historia humana. La referencia narrativa es Year in Search de Google, llevado a escala del campus.

### Concepto A · «Nos vemos ahí» (primera propuesta)

Una estudiante recibe el aviso, comparte con ambas cámaras, descubre una reta en el feed, camina a la cancha y alguien le pasa el balón. Cierre: «Flashly. Nos vemos ahí» con la acción y su enlace o QR real.

### Concepto B · «Un mismo momento. Todo tu campus» (segunda propuesta)

Mantiene el lema «Haz que tu campus pase».

| Tiempo | Imagen y acción | Mensaje |
|---|---|---|
| 0–4 s | Cortes entre biblioteca, laboratorio, cafetería y cancha | «Todos los días te cruzas con ellos.» |
| 4–7 s | Suena la notificación; otros la reciben; pantalla dividida | «Hoy, comparte el mismo momento.» |
| 7–12 s | Flashly y el anillo ámbar de 2 min; alguien captura su momento | «Una vez al día. A una hora sorpresa.» |
| 12–17 s | Resultado de ambas cámaras; otros hacen lo mismo | «Tu momento. Tal cual.» |
| 17–24 s | Desbloqueo: las fotos llenan la pantalla | «Comparte el tuyo. Descubre el de los demás.» |
| 24–30 s | El mosaico se resuelve en el cierre | «Flashly. Haz que tu campus pase.» + llamada a la acción real |

El momento clave es el desbloqueo: reconocer a alguien del pasillo y ver la universidad desde otra perspectiva.

Decisiones de acabado que propone:

- Vida universitaria reconocible en lugar de ilustraciones.
- Una transformación visual clara: escenas separadas que el aviso conecta en un mosaico.
- Color con función: violeta y rosa para la identidad, ámbar para la alerta.
- Interfaz grande y legible, con menos giros del teléfono.
- Sonido reconocible: notificación, disparo de cámara y música que crece con las publicaciones.
- Texto breve y estable, con tiempo suficiente para leerlo.

Correcciones que señala:

1. Usar un teléfono Android o un marco neutro, porque la app se distribuye como APK.
2. No insinuar que después de los 2 minutos no se puede publicar, porque existe la publicación tarde.
3. Decir que los momentos «dejan de mostrarse» en lugar de «se borra».

Sensación que busca: *«Quiero formar parte del próximo flash de mi universidad.»*

---

## 6. Evaluación de la retroalimentación

### De acuerdo

- El diagnóstico es correcto. Para una app que nadie conoce, el estilo keynote es un gancho débil. El plano de la parte trasera desvía la atención hacia un hardware que no es de Flashly, y meter siete funciones diluye la idea.
- El **Concepto B** es mejor que el A, porque parte de la mecánica única: todo el campus en el mismo instante. El A cuenta un caso de uso que podría ser de cualquier app de eventos.
- Mostrar la recompensa antes que la regla: «Comparte el tuyo. Descubre el de los demás.»
- El teléfono 3D de la v2 no tiene marca, pero parece un iPhone por la isla y la barra de estado. Conviene un Android o un marco neutro.
- Ninguna versión cierra con una acción y un destino reales.

### Matices

- **«Se borra»:** la propia app usa esa frase. La tercera pantalla de onboarding dice «Todo se borra en 24 horas» y el README menciona «el borrado a las 24 h». No es un error del video. Si se quiere más precisión, el texto a corregir es el de la app.
- **Dos minutos:** ninguna versión insinúa que después ya no se puede publicar, pero conviene cuidarlo.
- **Texto:** el Concepto B todavía tiene 5 frases en 30 s. Recomiendo dejarlo en 3 (gancho, «Una vez al día. A una hora sorpresa.» y cierre) y que la imagen cuente el resto.

### El obstáculo real: la imagen

El Concepto B depende de personas y lugares creíbles, y eso no se puede generar con calidad desde aquí. Opciones:

1. **Grabar en la UTSV con el celular (recomendado).** Clips de 2 a 4 s: laboratorio, cafetería, cancha y 3 o 4 personas recibiendo la notificación. Es coherente con la idea de la app («tal cual»). A partir de la lista de tomas se hace el montaje, la interfaz encima, la tipografía y el sonido.
2. **Imágenes generadas con IA** (Canva está disponible en la sesión). Las personas son inconsistentes de un plano a otro y se nota lo artificial, lo cual contradice el mensaje de autenticidad.
3. **Stock.** No sería la UTSV y se pierde lo de «tu campus».

---

## 7. Decisiones pendientes

- [ ] ¿Pueden grabar los clips en el campus?
- [ ] ¿Qué acción real va al cierre: QR al APK, lista de espera, Instagram u otra?
- [ ] Confirmar el **Concepto B** («Un mismo momento. Todo tu campus») como dirección.
- [ ] ¿Se ajusta el texto de la app de «se borra» a «deja de mostrarse», o se mantiene?

## 8. Siguientes pasos

1. Entregar el guion por segundos del Concepto B, con solo 3 textos en pantalla.
2. Entregar el storyboard con cuadros dibujados para revisar historia, legibilidad y cierre.
3. Entregar la lista de tomas para grabar en la UTSV: plano, duración, encuadre y acción.
4. Con los clips: montaje, interfaz real en grande con marco Android o neutro, sonido diseñado (notificación propia, cámara, música que crece en el desbloqueo) y cierre con la acción real.

---

## 9. Archivos en `files/`

| Archivo | Qué es |
|---|---|
| `Flashly_Comercial_30s.mp4` | v1, oscuro neón, 30 s |
| `Flashly_Comercial_30s_fuente.zip` | Proyecto editable de la v1 (HTML + música) |
| `Flashly_Pelicula_45s.mp4` | v2, estilo keynote, 45 s |
| `Flashly_Pelicula_45s_fuente.zip` | Proyecto editable de la v2 (Three.js + pantallas + música) |
| `Flashly_Concepto.txt` | Resumen completo del concepto de la app |
| `Flashly_Contexto_Comerciales.md` | Este documento |
