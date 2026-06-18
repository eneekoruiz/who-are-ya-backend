# Who Are Ya? Backend

Servidor de la aplicacion de adivinanzas de futbol Who Are Ya. Expone la informacion de jugadores, gestiona usuarios y ofrece una interfaz web sencilla para las tareas de administracion.

## Requisitos

- Node.js 18 o posterior
- MongoDB

Crea un archivo `.env` a partir de `.env.example` y completa la URL de conexion:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/who-are-ya
SESSION_SECRET=replace-with-a-random-value
PORT=3000
```

## Ejecucion

```bash
npm ci
npm start
```

El endpoint `GET /health` permite comprobar que el servidor esta respondiendo. La conexion a MongoDB debe completarse antes de que el servidor empiece a escuchar.

Para cargar los datos incluidos en `public/json/fullplayers25.json`:

```bash
npm run seed
```

El comando de carga elimina primero las ligas, equipos y jugadores existentes en la base configurada.

## Rutas principales

- `/api/players`: consulta publica y operaciones de administracion autenticadas.
- `/api/auth`: registro, inicio y cierre de sesion.
- `/admin`: vistas de administracion protegidas.

## Documentacion

La [documentacion en DeepWiki](https://deepwiki.com/eneekoruiz/who-are-ya-backend) complementa este README con una vista del codigo y sus relaciones.
