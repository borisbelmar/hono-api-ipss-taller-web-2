# hono-api

REST API de Todos construida con [Hono](https://hono.dev/) y Node.js.

## Requisitos

- Node.js 18+
- Yarn

## Instalación

```bash
yarn install
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `yarn dev` | Servidor en modo desarrollo con hot reload (nodemon) |
| `yarn build` | Compila y minifica a `dist/` |
| `yarn start` | Ejecuta el build de producción |

## Endpoints

Base URL: `http://localhost:3000`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/todos` | Lista todos los todos |
| GET | `/todos/:id` | Obtiene un todo por ID |
| POST | `/todos` | Crea un nuevo todo |
| PUT | `/todos/:id` | Actualiza un todo |
| DELETE | `/todos/:id` | Elimina un todo |

### Ejemplos

**Crear un todo**
```http
POST /todos
Content-Type: application/json

{ "title": "Mi nueva tarea" }
```

**Actualizar un todo**
```http
PUT /todos/1
Content-Type: application/json

{ "title": "Tarea actualizada", "completed": true }
```

## Stack

- [Hono](https://hono.dev/) — framework web
- [tsup](https://tsup.egoist.dev/) — bundler
- [nodemon](https://nodemon.io/) + [ts-node](https://typestrong.org/ts-node/) — desarrollo
