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

## Uso de IA
Claude fue utilizado como asistente durante el desarrollo. Fue más efectivo para explicar conceptos nuevos, resolver errores de TypeScript y configurar servicios externos como Firebase y AWS SES. El patrón más útil fue describir el problema con contexto específico para obtener soluciones precisas.
