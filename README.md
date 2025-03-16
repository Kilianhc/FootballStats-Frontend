# FootballStats

FootballStats es una aplicación Full-stack desarrollada con el stack MERN (MongoDB, Express, React y Node.js). Permite gestionar estadísticas de fútbol para equipos y jugadores, ofreciendo herramientas tanto para analistas como para entrenadores.

## Características principales

- **Aplicación Full-stack** utilizando el stack MERN (MongoDB, Express, React y Node.js).
- **Frontend SPA** desarrollado con React, con múltiples vistas e implementación completa de acciones CRUD.
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
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Token (JWT)
- **Otros:** bcrypt.js para cifrado de contraseñas

## Contribuciones
Si deseas contribuir, por favor abre un Issue o un Pull Request en el repositorio.

## Licencia
Este proyecto está bajo la licencia MIT. Para más información, consulta el archivo `LICENSE`.

