# FootballStats

FootballStats es una aplicación Full-stack desarrollada con el stack MERN (MongoDB, Express, React y Node.js). Permite gestionar estadísticas de fútbol para equipos y jugadores, ofreciendo herramientas tanto para analistas como para entrenadores.

## Características principales

- **Aplicación Full-stack** utilizando el stack MERN (MongoDB, Express, React y Node.js).
- **Frontend SPA** desarrollado con React, con múltiples vistas e implementación completa de acciones CRUD, y estilos con Material UI.
- **Backend API REST** construido con ExpressJS, MongoDB y Mongoose.
- **Base de datos con 4 modelos:**
  - `User`
  - `Player`
  - `Team`
  - `Stats`
- **Autenticación y autorización:**
  - Registro, inicio de sesión y cierre de sesión.
  - Contraseñas cifradas para mayor seguridad.
  - Usuarios con roles diferenciados.
- **Integración de Inteligencia Artificial (IA)**
  - **Moderación de mensajes** mediante Perspective API.
  - **Generación de recomendaciones tácticas** con la API de Gemini.
  - **Limitación de peticiones** con Express Rate Limit para evitar abusos.

## Implementación de IA

La aplicación cuenta con una integración de IA que permite a los usuarios (entrenadores y analistas) obtener recomendaciones estratégicas y tácticas basadas en los datos de su equipo. 

### **1️⃣ Moderación de Contenido con Perspective API**
Antes de procesar cualquier solicitud de análisis, el mensaje ingresado por el usuario pasa por una moderación con la **Perspective API** de Google, que detecta y bloquea contenido ofensivo o inapropiado.

### **2️⃣ Generación de Recomendaciones con Gemini AI**
Una vez aprobado el mensaje, la aplicación consulta la API de **Gemini AI** para analizar los datos de los jugadores y generar respuestas basadas en estadísticas. 

El asistente de IA responde preguntas sobre:
- Desempeño individual de jugadores.
- Comparaciones entre jugadores del equipo.
- Estrategias basadas en estadísticas recientes.

### **3️⃣ Limitación de Peticiones con Express Rate Limit**
Para evitar el abuso del chatbot, se ha implementado un sistema de rate limiting con **Express Rate Limit**:
- **Máximo de 20 solicitudes cada 30 minutos por usuario.**
- **Control basado en el ID del usuario autenticado**, evitando bloqueos generales por IP.

## Roles de Usuario

### Analista
- Crear equipos y añadir jugadores a esos equipos.
- Eliminar jugadores de los equipos.
- Crear estadísticas de los jugadores y actualizarlas tras cada partido.

### Entrenador
- Asignarse a un equipo ya creado.
- Ver la lista de jugadores de su equipo.
- Consultar estadísticas de jugadores:
  - De manera conjunta.
  - Filtradas por posición del jugador.
  - Representadas en gráficas generadas automáticamente.

## Enlaces
- [Repositorio Backend](https://github.com/Kilianhc/FootballStats-Back)
- [Versión Desplegada](https://analyststats.netlify.app/)

## Instalación y Uso

### Requisitos previos
- Node.js instalado.
- MongoDB en funcionamiento.
- Clave de API para Perspective y Gemini (configurada en `.env`).

### Instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/FootballStats.git
   cd FootballStats
   ```
2. Instalar dependencias del backend:
   ```sh
   cd backend
   npm install
   ```
3. Instalar dependencias del frontend:
   ```sh
   cd ../frontend
   npm install
   ```
4. Configurar variables de entorno en un archivo `.env` en la carpeta del backend:
   ```env
   MONGO_URI=tu_url_de_mongodb
   JWT_SECRET=tu_secreto
   PERSPECTIVE_API_KEY=tu_api_key
   GEMINI_API_KEY=tu_api_key
   ```

### Ejecución
1. Iniciar el backend:
   ```sh
   cd backend
   npm start
   ```
2. Iniciar el frontend:
   ```sh
   cd frontend
   npm start
   ```
3. Acceder a la aplicación en el navegador en `http://localhost:3000`.

## Tecnologías utilizadas
- **Frontend:** React, React Router, Axios, Material UI
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Token (JWT)
- **Inteligencia Artificial:** Google Perspective API, Google Gemini AI
- **Otros:** bcrypt.js para cifrado de contraseñas, Express Rate Limit para control de peticiones

## Contribuciones
Si deseas contribuir, por favor abre un Issue o un Pull Request en el repositorio.

## Licencia
Este proyecto está bajo la licencia MIT. Para más información, consulta el archivo `LICENSE`.

