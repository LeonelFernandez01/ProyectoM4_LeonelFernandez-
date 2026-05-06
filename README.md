# Gestor Estratégico de Tareas - PIM4

App SPA de gestión de tareas con autenticación, persistencia en la nube y notificaciones por email.

## Stack
- React + TypeScript
- Firebase (Auth + Firestore)
- AWS SES (emails via Vercel Functions)
- Vercel (deploy)
- Vitest + React Testing Library (testing)

## Descripción
Aplicación web para que empleados puedan gestionar tareas diarias de forma organizada, persistente y accesible desde cualquier dispositivo. Cada usuario solo puede ver sus propias tareas.

## Decisiones arquitectónicas
- BaaS con Firebase para evitar backend propio
- Vercel Functions para el envío de emails sin exponer credenciales AWS en el frontend
- Código organizado por capas: pages, components, services, hooks, types

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