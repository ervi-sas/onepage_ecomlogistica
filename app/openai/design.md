# Revisión y propuesta de diseño

## Diagnóstico general

La landing tiene más intención estratégica que una página corporativa básica: hay jerarquía de secciones, navegación anclada, responsive, estados de formulario, FAQ accesible y soporte para `prefers-reduced-motion`. Sin embargo, el resultado se siente como una composición conceptual de una agencia, no como la interfaz de una compañía de comercio y logística que debe transmitir escala, precisión, confianza y capacidad de ejecución.

El principal problema no es la falta de elementos, sino la falta de evidencia. El diseño dedica mucho espacio a adornos, cortes diagonales y gradientes, pero casi no muestra la operación, sus resultados, sus personas, sus instalaciones, sus integraciones o el proceso real de servicio. La página afirma control y trazabilidad sin convertir esas promesas en pruebas visuales.

## Problemas actuales

### Identidad visual

- El violeta, índigo y cian neón generan una estética tecnológica genérica. Se parece más a una startup de software que a una plataforma de comercio y logística.
- Los cortes diagonales aparecen en botones, tarjetas y separadores. Como recurso repetido pierden significado y hacen que la interfaz se sienta decorativa.
- La ausencia de fotografía, mapas, datos, empaques, vehículos, bodegas o capturas de producto deja la marca sin contexto físico.
- El logo aparece como un SVG improvisado en el HTML y no se percibe una guía clara de uso de marca, proporciones o estados.

### Jerarquía y navegación

- El hero tiene una promesa extensa: “Comercialización y logística para quien fabrica o importa” describe el servicio, pero no expresa el resultado que obtiene el cliente.
- La navegación mezcla temas de distinta jerarquía: “Servicios”, “Cómo funciona”, “Para quién”, “Importadores” y “Preguntas”. No incluye una entrada clara a resultados, casos o prueba de confianza.
- Los identificadores de secciones en el código están numerados de forma inconsistente y no hay una sección explícita de prueba social, métricas o casos.
- Hay varios bloques que repiten la misma idea de control, operación integrada y reducción de carga, sin aumentar la certeza del usuario.

### Conversión y confianza

- El CTA “Cotizar operación” aparece antes de que el usuario conozca alcance, cobertura, modelo de trabajo o criterios de precio. “Diseñar mi operación” sería más consultivo y menos transaccional.
- No hay logos de clientes, testimonios, categorías atendidas con evidencia, indicadores operativos ni referencias verificables.
- “Operación propia en Colombia”, “cobertura nacional” y “distribución nacional” son afirmaciones fuertes que necesitan alcance, cifras o una explicación precisa.
- El formulario pide varios datos y simula el envío con un `setTimeout`; no hay endpoint real, consentimiento de tratamiento de datos ni explicación de qué ocurrirá después.
- Los campos están bien agrupados, pero el formulario no califica de manera explícita el volumen, el número de pedidos o la urgencia, datos más útiles para una propuesta logística.

### Contenido visual

- El panel del hero es una lista abstracta; podría ser un componente real de operación: estado de inventario, pedidos por etapa, cobertura o una línea de flujo.
- Las tarjetas usan iconos lineales genéricos y no diferencian visualmente comercialización, logística y fulfillment más allá del dibujo.
- La sección “Cómo funciona” lista siete pasos en vertical, pero no comunica qué recibe el cliente en cada etapa ni cuáles son los puntos de control.
- La sección de visibilidad promete reportes, pero no muestra una interfaz, ejemplo de reporte o indicador.
- La sección de onboarding se percibe como checklist administrativo y no como una implementación acompañada con hitos, responsables y salida a producción.

### Legibilidad y accesibilidad

- El contraste de varios textos secundarios sobre fondos oscuros y gradientes puede quedar por debajo de un nivel cómodo, aunque algunos pares cumplan técnicamente.
- El cuerpo usa tamaños cercanos a 0.9rem en muchas tarjetas, lo que reduce la lectura en pantallas pequeñas.
- Las formas con `clip-path` pueden dificultar la percepción de foco y de límites interactivos.
- El botón de navegación móvil tiene etiqueta accesible, pero conviene cerrar el menú con `Escape`, gestionar foco y bloquear el scroll del fondo.
- El FAQ usa botones, pero debería asociar explícitamente cada respuesta con `aria-controls` y un `id`, además de contemplar el estado inicial y el foco visible.
- La animación SVG del hero y los reveals deben tener un fallback robusto; no basta con ocultar `animateMotion` mediante una regla CSS poco específica.

## Dirección recomendada

### Idea rectora

Adoptar una identidad de “infraestructura comercial visible”: sobria, precisa y humana. El diseño debe hacer sentir que Ervi conoce el recorrido completo de un producto, desde el inventario hasta el recaudo.

### Paleta

- Usar un fondo marfil o gris cálido para las superficies principales y un azul petróleo, grafito o verde profundo como color de confianza.
- Reservar un color energético, como naranja logístico o lima controlado, para estados, rutas, datos y CTA.
- Reducir los gradientes saturados y usar color plano con contraste deliberado.
- Definir tokens de color para texto principal, texto secundario, borde, superficie, éxito, alerta y error; no depender de transparencias sobre fondos cambiantes.

### Tipografía

- Mantener una sans display con personalidad para titulares, pero limitarla a titulares y cifras.
- Usar una sans altamente legible para párrafos, formularios y navegación.
- Eliminar la dependencia visual del estilo monoespaciado como recurso constante: puede servir para etiquetas técnicas y estados, no para cada eyebrow.
- Aumentar el cuerpo base a 1rem como mínimo y mantener una medida de lectura entre 55 y 70 caracteres.

### Hero

- Cambiar el fondo abstracto por una composición de producto real: una foto de operación, una imagen editorial de bodega/entrega o un dashboard verosímil con datos anonimizados.
- Mostrar una promesa de resultado en el titular y explicar el alcance en el subtítulo.
- Incluir una franja de confianza debajo de los CTA: categorías, ciudades, tipo de operación, integraciones o un dato verificable.
- Mantener un único CTA principal y un secundario de menor peso visual. El CTA debe llevar a un formulario consultivo o a un diagnóstico.

### Estructura de información

- Después del hero, introducir una sección breve de credenciales o indicadores antes de explicar el catálogo de servicios.
- Presentar los tres servicios como un sistema conectado, con una ruta visual `vender → preparar → entregar → cobrar`.
- Convertir “Para quién” en un selector de perfiles o casos de uso para que el visitante se reconozca rápido.
- Integrar importadores como caso de uso relevante, no como un bloque aislado que repite la propuesta general.
- Agregar un caso de éxito o escenario ilustrativo con problema, intervención y resultado. Si no hay datos publicados, usar un ejemplo claramente etiquetado como ilustrativo.
- Mantener FAQ cerca del CTA final y reducirla a preguntas que eliminen objeciones comerciales reales.

### Componentes y layout

- Reemplazar la repetición de tarjetas idénticas por una jerarquía de una tarjeta principal y dos secundarias, o por un diagrama de flujo.
- Usar una retícula consistente de 12 columnas en desktop, con anchos de texto controlados y espacios verticales menos uniformes.
- Reservar los bordes y sombras para indicar agrupación o prioridad, no como decoración en cada bloque.
- Sustituir la mayoría de las esquinas diagonales por radios discretos o esquinas rectas. Conservar un único gesto distintivo en CTA o hero.
- Diseñar estados hover, focus, error, éxito, carga y deshabilitado para todos los controles, no solo para los botones principales.

### Prueba de operación

- Incluir una visualización simple de estados de pedido: recibido, preparado, despachado, entregado y conciliado.
- Mostrar una captura o mockup de inventario por SKU, reportes o catálogo digital.
- Incorporar un mapa solo si representa cobertura real y no es un adorno.
- Añadir fotografía de personas y mercancía para equilibrar la interfaz tecnológica con la realidad del servicio.
- Usar iconografía consistente, con un set propio o una librería única; evitar SVGs aislados de estilos distintos.

### Formulario y conversión

- Cambiar el título a una invitación de diagnóstico, no a una solicitud genérica de cotización.
- Dividir el formulario en datos de contacto y contexto de operación, o usar un formulario progresivo si se requieren muchos campos.
- Añadir selectores para tipo de empresa, volumen aproximado, canales y ciudades; facilitan la calificación sin obligar a escribir demasiado.
- Mostrar una nota de privacidad y un tiempo esperado de respuesta.
- Conectar el formulario a un backend real, registrar estados de éxito/error y evitar confirmar un envío que no ocurrió.
- Ofrecer una alternativa inmediata de contacto, como WhatsApp o correo corporativo, si el negocio realmente la atiende.

### Responsive

- En móvil, conservar el mensaje principal, un CTA visible y una sola prueba de valor antes de comenzar el scroll largo.
- Evitar que el menú móvil oculte el CTA principal sin ofrecerlo dentro del panel abierto.
- Convertir grids de tres o cuatro columnas en carruseles solo si existe una razón de uso; por defecto, usar bloques apilados fáciles de comparar.
- Revisar los saltos de línea del hero, el ancho de botones, la altura de inputs y la lectura de tablas o estados.
- Probar el diseño en 320px, 375px, 768px y anchos desktop, incluyendo teclado y orientación horizontal.

### Accesibilidad y calidad

- Garantizar contraste WCAG AA, foco visible y áreas táctiles de al menos 44px.
- Respetar `prefers-reduced-motion` desactivando completamente animaciones decorativas, no solo una parte del SVG.
- Añadir `aria-controls`, `aria-expanded` y relaciones semánticas correctas al acordeón; permitir interacción por teclado.
- Usar HTML semántico, un solo `h1`, jerarquía de encabezados continua y labels siempre visibles.
- Añadir `scroll-margin-top` a secciones ancladas para que el nav fijo no tape los títulos.
- Comprimir imágenes, usar formatos modernos y cargar contenido no crítico de forma diferida.
- Medir CTA, envío de formulario, apertura de FAQ y clics de contacto con analítica que respete consentimiento.

## Prioridad de implementación

### Alta

- Reescribir hero, CTA, servicios y formulario con la propuesta de valor orientada a resultados.
- Añadir pruebas verificables: métricas, cobertura real, clientes, casos o capacidades.
- Reemplazar el hero abstracto por evidencia visual de la operación.
- Corregir el flujo de contacto para no simular envíos.
- Mejorar contraste, foco, semántica del FAQ y navegación móvil.

### Media

- Rediseñar el sistema de tarjetas y reducir cortes diagonales.
- Crear un diagrama visual del flujo comercial-logístico-financiero.
- Incorporar un caso de uso por perfil y una visualización de estados.
- Revisar nomenclatura, anclas y orden de navegación.

### Baja

- Refinar microinteracciones y animaciones de entrada.
- Crear un set propio de iconos y una guía de uso del logo.
- Añadir personalización progresiva por segmento o fuente de campaña.
