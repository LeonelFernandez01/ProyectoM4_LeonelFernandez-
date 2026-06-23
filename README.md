# Gestor Estratégico de Tareas - PIM4

App SPA de gestión de tareas con autenticación, persistencia en la nube y notificaciones por email.

## Stack
- React + TypeScript
- Firebase (Auth + Firestore)
- AWS SES (emails via Vercel Functions)
- Vercel (deploy)
- Vitest + React Testing Library (testing)

## Descripción
Aplicación web premium para que empleados puedan gestionar tareas diarias de forma organizada, interactiva y accesible. Cada usuario dispone de un espacio privado de tareas con las siguientes funcionalidades mejoradas:
- **Estética Premium con Glassmorphism**: Diseño de cristal refinado, sombras sutiles y micro-animaciones en interacciones de usuario (hover, click, check).
- **Tema Dual Persistente (Modo Claro/Oscuro)**: Interruptor en cabecera con persistencia en `localStorage` y detección del tema del sistema operativo.
- **Dashboard de Estadísticas**: Panel interactivo superior con contadores en tiempo real (Totales, Pendientes, Completadas) y un anillo de progreso animado SVG.
- **Sistema de Prioridades y Categorización**: Clasificación de tareas en prioridades Alta 🔴, Media 🟡 y Baja 🔵, con etiquetas/categorías personalizadas.
- **Fechas de Vencimiento**: Configuración de fecha límite con badges que alertan si la tarea está vencida o vence hoy.
- **Buscador y Filtros Avanzados**: Barra de búsqueda por texto y dropdowns para filtrar por estado/prioridad y ordenar según prioridad, vencimiento o fecha de creación.
- **Correos Detallados**: Envío de resumen formateado con metadatos (prioridad, etiquetas, plazos) a través de AWS SES.

## Decisiones arquitectónicas
- **BaaS con Firebase**: Autenticación y Firestore en tiempo real (`onSnapshot`) para evitar backend propio.
- **Vercel Functions**: Envío seguro de correos usando `nodemailer` con credenciales de AWS SES en el servidor.
- **Esquema de Datos Extensible**: Inclusión de campos opcionales (`priority`, `category`, `dueDate`) en la interfaz `Task`, garantizando total compatibilidad con tareas previas.
- **Estilización nativa y Modular**: Utilización de Vanilla CSS con variables CSS dinámicas para manejar el cambio de tema de manera eficiente sin dependencias externas.
- **Arquitectura Limpia**: Separación en capas: pages, components, services, hooks, types y utils.

## Instalación
```bash
npm install
npm run dev
```

## Variables de entorno
Copiar `.env.example` a `.env` y completar:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SES_FROM_EMAIL=

## URL de producción
https://proyecto-m4-leonel-fernandez-jn4h.vercel.app

## Flujo de envío de emails
1. Usuario hace click en "Enviar resumen"
2. Frontend llama a `/api/send-email` (Vercel Function)
3. La función usa AWS SES con credenciales seguras del servidor
4. SES envía el email al usuario autenticado

## Tests
```bash
npm run test
```

## Uso Crítico y Responsable de IA

### Cómo integré la IA en el proceso
Utilicé Claude (Anthropic) como asistente durante todo el desarrollo del proyecto.

### Situaciones donde fue más efectiva
- **Resolución de errores**: Cuando aparecían errores de TypeScript o de configuración, 
  describía el error exacto y el contexto, obteniendo soluciones precisas.
- **Configuración de servicios externos**: Firebase, AWS SES y Vercel Functions 
  tienen mucha configuración. La IA ayudó a entender cada paso.
- **Explicación de conceptos**: Antes de implementar algo nuevo (onSnapshot, 
  Vercel Functions, Firestore Rules) pedía explicación del concepto primero.

### Patrones y buenas prácticas descubiertas
- **Pedir explicación antes del código**: Entender qué hace algo antes de pegarlo.
- **Compartir el error completo**: Copiar el error exacto de la consola da mejores respuestas.
- **Validar el código generado**: Todo el código fue revisado y comprendido antes de usarlo.
- **Iterar con contexto**: Mantener la conversación con contexto previo mejora las respuestas.

### Decisiones técnicas tomadas con apoyo de IA
- Usar `onSnapshot` en vez de `getDocs` para tiempo real
- Separar la lógica en hooks (`useAuth`, `useTasks`) para mejor organización
- Invocar AWS SES desde Vercel Functions para no exponer credenciales