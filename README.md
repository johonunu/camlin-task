# Camlin task

This was the assigment for Senior Frontend Software Engineer position at Camlin Group.

## Technologies used

- Vue 3
- Vite
- TypeScript
- TailwindCSS
- Daisy UI
- Pinia
- Chart.js

## Features

- Table component has filtering per column and sorting
- Table row animation
- Hovering over table row will highlight line on the line chart
- Toggle chart selection for each line or all at once
- Keep all user preferences in local storage
- Light and dark mode

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

To run project localy, run the following command in the root directory of the project:

```sh
npm install
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

Deployment of the task is done using Docker.

Make sure you have Docker installed on the server (you can find [instructions here](https://docs.docker.com/engine/install/)).

I used Alpine base image with Nginx as HTTP server.

You can run following command to build and run the container:

```
docker build . -t camlin-task -f ./Dockerfile
docker run -p 8080:80 camlin-task
```

After that, application should be accesable at <http://localhost:8080>

You can also use docker compose if you have it installed and running:

```
docker compose build
docker compose up
```
