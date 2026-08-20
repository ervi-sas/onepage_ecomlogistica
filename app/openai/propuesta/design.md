# Crítica de diseño y nueva dirección visual

## Veredicto

La página de Claude parece moderna durante los primeros cinco segundos y genérica durante todos los siguientes. Cumple con el inventario superficial de una landing tecnológica —fondo oscuro, gradientes, tarjetas, tipografía geométrica, números monoespaciados y animaciones al hacer scroll—, pero no construye una identidad para Ervi ni demuestra que detrás exista una operación comercial y logística real.

**Evaluación global: 4/10.**

- **Identidad de marca: 2/10.** Ignora los activos oficiales e inventa otros.
- **Claridad comercial: 5/10.** Enumera servicios, pero repite argumentos y no jerarquiza el valor.
- **Credibilidad: 3/10.** Hay muchas afirmaciones y ninguna prueba.
- **Diseño visual: 5/10.** Es consistente, pero intercambiable con cualquier SaaS B2B.
- **Conversión: 4/10.** Pide una cotización sin construir suficiente confianza y simula el envío.
- **Accesibilidad y calidad técnica: 6/10.** Tiene buenas intenciones, pero la ejecución queda incompleta.

El problema central: Claude diseñó la idea de “empresa moderna”, no la marca ni el negocio de Ervi.

---

## Fallos graves

### 1. Ignoró la marca que ya existía

En `app` están disponibles:

- `logo_ervi_web.svg`: logo horizontal blanco con símbolo oficial.
- `Logo-ERVI_V1.png`: versión oscura para fondos claros.
- `Favicon_ervi.png`: favicon pequeño.
- `Favicon_ervi_2026.png`: versión de mayor resolución.

Claude no usó ninguno. En su lugar dibujó dos polígonos blancos y cian y escribió “ERVI” con texto HTML. Ese símbolo falso no reproduce la geometría, las tres rutas, las proporciones ni la combinación violeta-cian del isotipo real. El footer repite el mismo error.

Peor aún: el HTML enlaza `favicon.png`, pero ese archivo no existe en `app/claude`. El navegador solicitará un recurso inexistente mientras los favicons oficiales están un directorio arriba. No es una decisión estética; es una omisión básica de implementación.

El logo oficial ya ofrecía una idea visual potente: rutas paralelas que avanzan y convergen. Claude tenía el concepto de marca delante y lo reemplazó por decoración sin significado.

### 2. Confundió “tecnológico” con “morado y neón”

El fondo violeta, el cian brillante, el glassmorphism y los cortes diagonales producen una estética de plantilla para fintech, ciberseguridad o software de 2021. No expresan mercancía, territorio, precisión, capacidad ni movimiento.

La paleta se inspira de lejos en el logo, pero no la convierte en sistema. Saturar casi toda la página con violeta oscuro hace que el acento cian pierda valor y que las secciones se fundan en una larga masa nocturna.

Una empresa moderna no se ve moderna por tener un gradiente. Se ve moderna cuando convierte una operación compleja en información clara.

### 3. Claude ignoró la única evidencia disponible

La página no muestra ni explica:

- El respaldo logístico de Almagrario.
- Sus más de 60 años de trayectoria.
- La capacidad disponible en Bogotá, Funza, Cali, Itagüí, Bucaramanga, Barranquilla, Santa Marta y Cartagena.
- El uso potencial del WMS de Almagrario.
- El modelo de dropshipping de Ervi.
- Las categorías con mejor encaje: repuestos, accesorios, retail e inventario general.

En cambio, habla de “operación propia” y “cobertura nacional”, dos afirmaciones que no describen correctamente el modelo. Ervi es una propuesta joven respaldada logísticamente por un aliado experimentado. Esa historia es más específica, más honesta y más interesante que fingir la escala de una empresa consolidada.

### 4. La landing es demasiado larga para lo poco que avanza

“Qué hacemos”, “Cómo funciona”, “Servicios”, “Para quién”, “Importadores” y “Visibilidad” reformulan varias veces la misma idea: centralizamos para que tengas control. La repetición no agrega confianza; solo aumenta el scroll.

Hay 11 bloques funcionales, numerosos separadores y decenas de tarjetas, pero ninguna historia concreta. La página tiene volumen, no profundidad.

### 5. El formulario engaña al usuario

El script evita el envío, espera 600 ms y muestra: “Recibimos tu solicitud”. No se recibió nada. Es una confirmación falsa.

Esto es especialmente grave en una página cuyo argumento es trazabilidad y responsabilidad operativa. La primera transacción digital de la marca simula haber ocurrido.

También faltan:

- Backend o integración real.
- Consentimiento de tratamiento de datos.
- Enlace a política de privacidad.
- Estado de error de red.
- Tiempo real de respuesta.
- Canal alternativo de contacto.

---

## Crítica por área

### Hero

- El titular “Comercialización y logística para quien fabrica o importa” es una categoría, no una propuesta de valor.
- El párrafo intenta incluir supermercados, TAT, digital, cartera y transportadoras en una sola oración. Explica demasiado y posiciona poco.
- El fondo consiste en tres diagonales translúcidas y un punto animado. No comunica una ruta real, un pedido o un dato; es un salvapantallas.
- El panel “Mientras arrancamos” suena provisional, incluso inseguro. Una empresa operativa no debería presentarse como si todavía estuviera configurándose.
- “Inventario y pedidos visibles” es una afirmación que debería mostrarse, no colocarse como bullet.
- No existe prueba inmediata de confianza bajo el CTA.

### Navegación

- Presenta cinco enlaces de igual jerarquía aunque algunos son servicio, otros segmento y otros contenido de soporte.
- “Importadores” merece tratamiento como caso de uso o solución, no como excepción suelta.
- El menú móvil oculta el CTA y no lo reintegra dentro del panel.
- No hay estado activo por sección.
- El header usa una versión inventada del logo y desperdicia el reconocimiento del activo oficial.

### Tarjetas y ritmo

- Casi todo se resuelve con una tarjeta. Cuando todo está contenido y bordeado, nada domina.
- Los cortes diagonales se usan en botones, iconos, cards y separadores. El gesto deja de ser firma y se convierte en ruido.
- El `border-radius: 6px` aplicado a todos los `.ev-reveal` contradice los `clip-path` angulares y genera un sistema formal incoherente.
- Los separadores diagonales de 46px no organizan el relato; solo interrumpen el fondo.
- Alternar papel y fondo oscuro no basta para crear ritmo editorial cuando las composiciones internas son siempre título + cards.

### Tipografía

- Space Grotesk + Inter + IBM Plex Mono es la combinación automática de “startup técnica”. Funciona, pero no distingue.
- La mono aparece en eyebrows, números y etiquetas sin que exista información verdaderamente técnica que lo justifique.
- Muchos textos de tarjeta están en 0.9–0.94rem; para una landing B2B extensa, esa escala fatiga.
- Los titulares son prudentes y compactos. Ninguno funciona como momento de marca.

### Color

- El violeta oscuro domina demasiado y aplana todos los bloques de valor.
- El cian se usa a la vez como marca, énfasis, estado, borde, glow y CTA. Sin semántica, todo compite.
- Las transparencias blancas sobre gradiente crean contrastes variables y un aspecto lavado.
- Los fondos “paper” tienen un tinte violeta que conserva la sensación digital, pero no aporta calidez ni materialidad.

### Contenido visual

- Los iconos son SVG genéricos de caja, camión y tarjeta. Reducen servicios complejos a clichés.
- El proceso de siete pasos es una lista; no muestra flujo, entradas, salidas ni dependencias.
- El onboarding de ocho cajas da protagonismo a trámites internos como “creación del cliente”. Eso importa a Ervi, no al visitante.
- La sección de visibilidad no tiene datos ni visualización.
- No hay una demostración del catálogo digital ni del e-commerce, a pesar de ser servicios centrales.

### Responsive

- En tablet, tres tarjetas pasan a una cuadrícula 2+1. La tercera queda visualmente huérfana.
- El hero apilado deja el panel genérico debajo del copy, aumentando altura sin sumar prueba.
- Los bloques largos se convierten en una secuencia interminable de tarjetas a una columna.
- No existe CTA móvil persistente ni acceso rápido al contacto después de ocultarlo en la navegación.
- El CSS responde a anchos, pero no rediseña prioridades para móvil.

### Accesibilidad y técnica

- Hay skip link, HTML razonablemente semántico y soporte inicial para reducción de movimiento. Son aciertos.
- El intento de desactivar `<animateMotion>` desde `.ev-hero__dot animateMotion` es frágil y no garantiza detener la animación SVG en todos los navegadores.
- El FAQ debería relacionar botones y paneles con `aria-controls`, `aria-labelledby` e identificadores.
- El menú móvil no gestiona `Escape`, foco, clic exterior ni bloqueo de scroll.
- Faltan estilos globales de `:focus-visible` para enlaces y botones.
- Las secciones ancladas no usan `scroll-margin-top`; el nav fijo puede tapar títulos.
- El correo solo se valida después de una comprobación manual y los errores se comunican principalmente por color y estilos inline.
- Cargar tres familias desde Google Fonts añade coste para una identidad que sigue viéndose genérica.

---

## Nueva dirección: “La ruta del producto”

La identidad debe nacer del activo que Claude ignoró. El isotipo oficial contiene tres trazos ascendentes en violeta y cian. Esos trazos pueden representar las tres capacidades de Ervi:

1. **Comercialización:** el producto encuentra demanda.
2. **Logística:** el pedido encuentra destino.
3. **Fulfillment:** la venta encuentra su recaudo.

Las tres rutas no deben ser un patrón decorativo repetido. Deben aparecer como un sistema que conecta secciones, estados y datos.

### Hechos que gobiernan el rediseño

- Ervi lleva un año desarrollando esta modalidad y aún no tiene clientes que puedan presentarse como caso.
- No se deben publicar testimonios, logos de clientes ni métricas de pedidos.
- No se usarán fotografías.
- Almagrario aporta respaldo logístico, más de 60 años de trayectoria, presencia en ocho ciudades y un sistema WMS robusto.
- La trayectoria y la infraestructura de Almagrario nunca deben atribuirse a Ervi.
- “Presencia en ocho ciudades” no equivale a “cobertura nacional” ni garantiza cualquier ruta.
- El diseño debe distinguir visualmente lo que coordina Ervi, lo que soporta Almagrario y lo que aporta el cliente.
- El logo de Almagrario solo debe aparecer si existe autorización de uso; de lo contrario, la relación se comunica mediante texto.

### Personalidad

- Precisa, no fría.
- Operativa, no industrial genérica.
- Tecnológica por claridad, no por neón.
- Ambiciosa, no grandilocuente.
- Colombiana por contexto y realidad, no por clichés visuales.

---

## Sistema visual propuesto

### Marca

- Usar `logo_ervi_web.svg` sobre fondos azul noche.
- Usar `Logo-ERVI_V1.png` sobre fondos blancos o muy claros.
- Usar `Favicon_ervi_2026.png` como fuente principal para generar tamaños de favicon; mantener `Favicon_ervi.png` si corresponde al tamaño nativo requerido.
- No reconstruir el logo con HTML ni modificar sus proporciones.
- Extraer del SVG los colores oficiales aproximados: violeta `#3703D6`, cian `#04DEFD`, blanco y azul noche del wordmark oscuro.
- Definir área de seguridad y tamaño mínimo del logo antes de maquetar el header.

### Paleta

**Base**

- Azul tinta: para texto, footer y secciones de autoridad.
- Blanco: para aire, lectura y contraste.
- Gris mineral: para superficies de datos y divisores.

**Marca**

- Violeta oficial: navegación de ruta, links y énfasis selectivo.
- Cian oficial: estados activos, hitos y confirmaciones.

**Operación**

- Verde: entregado o conciliado.
- Ámbar: novedad o acción pendiente.
- Rojo: error o bloqueo.

El cian no debe indicar todo. Los colores de estado necesitan significado constante.

### Tipografía

- Elegir una sola familia variable con buena legibilidad y amplitud de pesos, más una display distintiva si realmente se necesita.
- Evitar la tríada predecible Space Grotesk/Inter/mono.
- Buscar una voz más editorial y contundente en titulares, con cuerpo neutral para operación y datos.
- Escala recomendada: hero de 64–80px en desktop, H2 de 40–52px, cuerpo principal de 18px y cuerpo secundario nunca menor de 16px.
- Usar números tabulares solo en métricas y estados reales.

### Lenguaje visual sin fotografía

- No usar fotografía propia ni de stock.
- Construir la identidad con mapas, rutas, nodos, estados, etiquetas de SKU y diagramas operativos.
- Usar ilustración vectorial solo cuando explique una relación real; evitar bodegas, camiones o cajas como decoración.
- Crear composiciones tipográficas amplias y alternarlas con visualizaciones de la red para evitar una página formada solo por tarjetas.
- Diferenciar siempre “representación del proceso” de “dato real”. Un diagrama no debe parecer un dashboard conectado.

### Iconografía

- Crear un set basado en rutas, nodos, contenedores y estados de pedido.
- Mantener grosor y geometría consistentes con el isotipo.
- No usar caja/camión/tarjeta como única explicación de cada servicio.

---

## Nueva composición de la landing

Se conserva la estructura funcional solicitada, pero cada bloque debe tener una composición distinta.

### Hero: producto + ruta + resultado

- Copy a la izquierda.
- A la derecha, un mapa abstracto pero geográficamente correcto de Colombia con los ocho nodos disponibles y las tres rutas de marca.
- Debajo, una banda de respaldo: “Logística apoyada por Almagrario”, “+60 años de trayectoria del aliado” y “WMS para control de inventario”.
- Atribuir cada credencial a Almagrario; no escribir “60 años de experiencia” junto al logo de Ervi sin aclaración.
- El CTA principal abre o desplaza al diagnóstico; el secundario lleva al recorrido.

### Necesidades: tres entradas, una ruta

- Evitar tres tarjetas idénticas.
- Usar un selector por perfil: fabricante, importador, multicanal.
- Al seleccionar, cambiar problema, solución y CTA sin duplicar toda la página.
- En móvil, presentarlo como tabs accesibles o acordeón.

### Qué hacemos: manifiesto operativo

- Una frase grande ocupa la mitad de la pantalla: “La venta no termina cuando entra el pedido”.
- La otra mitad muestra tres columnas conectadas: “Ervi coordina”, “Almagrario soporta” y “Tu empresa abastece y decide”.
- Sin cards ni fotografía; usar tipografía, líneas y responsabilidades concretas.

### Cómo funciona: recorrido visual

- Diseñar una ruta horizontal en desktop y vertical en móvil.
- Cada hito muestra acción, responsable, dato disponible y excepción posible.
- El trazo violeta representa comercialización, el azul logística y el cian fulfillment; convergen al final.
- Animar solo el progreso al entrar en viewport y desactivarlo por completo con reducción de movimiento.

### Servicios: tres capas conectadas

- Presentar cada servicio como una franja o capa, no como tres tarjetas aisladas.
- Mostrar qué incluye, qué recibe Ervi, qué entrega y qué resultado habilita.
- Permitir profundizar sin saturar la página mediante acordeones o enlaces a detalle.

### Para quién: diagnóstico honesto

- Mostrar “Sí encaja / Aún no encaja” en lugar de una lista complaciente donde todo cliente parece ideal.
- Mostrar como encaje inicial repuestos, accesorios, productos de retail y referencias de inventario general.
- No inventar volúmenes mínimos. Indicar que otras categorías requieren evaluación operativa.
- La honestidad filtra mejores leads y aumenta confianza.

### Importadores: escenario completo

- Utilizar un recorrido desde recepción local hasta recaudo.
- Diferenciar claramente lo que corresponde a Ervi Importación y lo que corresponde a la operación comercial/logística.
- Evitar que dos marcas o servicios parezcan competir o duplicarse.

### Respaldo operativo: mostrar la relación real

- Reemplazar la sección de visibilidad por una sección de respaldo operativo.
- Mostrar un mapa con Bogotá, Funza, Cali, Itagüí, Bucaramanga, Barranquilla, Santa Marta y Cartagena.
- Explicar que el inventario puede administrarse mediante el WMS de Almagrario, sin prometer portal, acceso en tiempo real o reportes aún no definidos.
- Incluir una leyenda clara: Ervi articula el modelo; Almagrario soporta la logística.
- No diseñar capturas de WMS ni dashboards ficticios. Si más adelante se obtiene autorización y material real, podrán incorporarse.
- No crear una sección de testimonios. La ausencia de casos es preferible a testimonios genéricos, anónimos o fabricados.

### Onboarding: fases y compromisos

- Reemplazar ocho cajas por seis fases con entregable visible.
- Mostrar qué aporta el cliente y qué entrega Ervi en cada fase.
- Indicar tiempo promedio solo si está medido.

### FAQ: objeciones reales

- Máximo seis o siete preguntas relevantes.
- Incorporar restricciones, modelo de facturación, cobertura y tiempos.
- Evitar respuestas evasivas del tipo “lo definimos contigo” sin explicar criterios.

### Contacto: diagnóstico, no buzón

- Pedir primero el problema y luego los datos.
- Usar selectores para perfil, volumen, canal y ciudad.
- Explicar qué ocurre después sin prometer un tiempo de respuesta que todavía no está definido.
- Mostrar contacto alternativo real.
- No confirmar nada hasta que el backend responda correctamente.
- Enlazar la política real: `https://tienda.ervi.com.co/policies/privacy-policy`.

---

## Interacciones

- El movimiento principal debe ser una ruta que avanza entre estados, no la aparición idéntica de cada card.
- Usar transiciones de 150–250 ms para controles y 400–600 ms para narración visual.
- Evitar glows permanentes, glassmorphism y parallax.
- Añadir feedback inmediato al seleccionar perfiles, avanzar en el formulario o consultar estados.
- Mantener todos los efectos opcionales; el contenido debe funcionar sin JavaScript y sin animación.

---

## Orden de ejecución

### 1. Corregir lo indefendible

- Usar logo y favicon oficiales.
- Eliminar el logo inventado.
- Conectar el formulario a un destino real o desactivar la confirmación falsa.
- Añadir privacidad y datos de contacto.
- Corregir foco, menú móvil, FAQ y anclas.

### 2. Conseguir evidencia

- Documentar formalmente la relación y división de responsabilidades con Almagrario.
- Confirmar autorización para usar el nombre y, si aplica, el logo de Almagrario.
- Precisar qué capacidad ofrece cada una de las ocho ciudades y qué rutas pueden atenderse.
- Documentar cómo se usará el WMS y qué información podrá recibir el cliente.
- Formalizar alcance, restricciones y categorías admitidas.
- No esperar testimonios o métricas para lanzar; sustituir esa prueba social por transparencia operativa.

### 3. Rediseñar el relato

- Implementar “Del producto listo al dinero recaudado”.
- Convertir los servicios en una sola ruta visual.
- Reducir repetición y número de tarjetas.
- Introducir el respaldo de Almagrario antes del segundo CTA, correctamente atribuido.

### 4. Construir el sistema

- Definir tokens, tipografía, retícula, iconos, estados y componentes.
- Diseñar primero hero, recorrido, evidencia y formulario.
- Adaptar deliberadamente a móvil; no limitarse a apilar columnas.

### 5. Validar

- Probar comprensión del hero con usuarios en cinco segundos.
- Medir clic al diagnóstico, inicio y finalización del formulario.
- Revisar WCAG AA, teclado, reducción de movimiento y dispositivos reales.
- Comprobar rendimiento, recursos inexistentes y errores de envío antes de publicar.

---

## Qué debería desaparecer de la versión de Claude

- El isotipo falso hecho con polígonos.
- El enlace a `favicon.png` inexistente.
- “Mientras arrancamos”.
- La colección de gradientes violetas como fondo universal.
- El punto luminoso que recorre una diagonal sin explicar nada.
- Los cortes de esquina en casi todos los componentes.
- Los iconos genéricos de caja, camión y tarjeta.
- Los separadores diagonales entre secciones.
- Las tarjetas usadas como solución para cualquier contenido.
- El CTA prematuro “Cotizar operación”.
- La etiqueta en inglés “Ideal fit” dentro de una página en español.
- La promesa no demostrada de “cobertura nacional”.
- La falsa confirmación de envío del formulario.

## Qué merece conservarse

- El uso de HTML semántico básico.
- El skip link.
- La intención de soportar `prefers-reduced-motion`.
- El FAQ basado en botones.
- La estructura responsive inicial.
- La idea de presentar la operación de extremo a extremo, pero con un relato mucho más claro, pruebas reales y la marca correcta.
