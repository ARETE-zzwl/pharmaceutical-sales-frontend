# Pharmaceutical Sales Frontend

Vue 3 frontend for the pharmaceutical sales and inventory management system.

## Features

- Login and registration flows
- Drug, inventory and batch management
- Sales, financial statistics and query views
- JWT-based API requests through Axios

## Tech Stack

- Vue 3
- Vue Router
- Axios
- Chart.js / vue-chartjs
- Tailwind CSS
- Vue CLI 5

## Requirements

- Node.js 18 or newer
- The backend service running on `http://localhost:8080`

## Install and Run

```bash
git clone https://github.com/ARETE-zzwl/pharmaceutical-sales-frontend.git
cd pharmaceutical-sales-frontend
npm install
npm run serve
```

The development server runs on `http://localhost:8081`. Requests under `/api` are proxied to the backend at `http://localhost:8080`.

## Production Build

```bash
npm run build
```

## Project Layout

- `src/views`: page-level views such as login, registration and home
- `src/components`: inventory, drug, sales and statistics components
- `src/router`: route and authentication guards
- `public`: static assets

## License

Licensed under the Mulan Permissive Software License, Version 2 (Mulan PSL v2). See [`LICENSE`](LICENSE).
