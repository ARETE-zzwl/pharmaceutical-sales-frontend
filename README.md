# Pharmaceutical Sales Frontend

[中文](#中文) · [English](#english)

## 中文

医药销售与库存管理系统的 Vue 3 前端。页面包括登录、注册、药品管理、库存与批次、销售查询和财务统计，通过 Axios 与后端交换数据。

配套后端：[pharmaceutical-sales-backend](https://github.com/ARETE-zzwl/pharmaceutical-sales-backend)。

### 本地运行

建议使用 Node.js 18 或更新版本。先启动后端，默认地址为 `http://localhost:8080`。

```bash
git clone https://github.com/ARETE-zzwl/pharmaceutical-sales-frontend.git
cd pharmaceutical-sales-frontend
npm install
npm run serve
```

打开 [localhost:8081](http://localhost:8081)。`npm run serve` 在启动参数中指定了 8081；`vue.config.js` 中的默认端口仍是 8080，直接调用其他启动方式时请留意端口冲突。

开发服务器会把 `/api` 请求转发到 `http://localhost:8080`。后端地址变化时，修改 [vue.config.js](vue.config.js) 中的代理配置。

### 构建

```bash
npm run build
```

构建产物在 `dist/`。部署时需要另行配置 `/api` 的反向代理；开发服务器的代理配置不会自动进入静态构建产物。

### 代码位置

| 目录 | 内容 |
| --- | --- |
| `src/views/` | 登录、注册和主页 |
| `src/components/` | 药品、库存、销售和统计页面组件 |
| `src/router/` | 路由和登录检查 |
| `public/` | 静态资源 |

项目使用 Vue Router、Axios、Chart.js / vue-chartjs、Tailwind CSS 和 Vue CLI 5。

## English

The Vue 3 frontend for a pharmaceutical sales and inventory system. It includes login and registration, drug and batch management, inventory views, sales queries and financial statistics. API requests use Axios.

Backend: [pharmaceutical-sales-backend](https://github.com/ARETE-zzwl/pharmaceutical-sales-backend).

### Run locally

Node.js 18 or later is recommended. Start the backend at `http://localhost:8080` first.

```bash
git clone https://github.com/ARETE-zzwl/pharmaceutical-sales-frontend.git
cd pharmaceutical-sales-frontend
npm install
npm run serve
```

Open [localhost:8081](http://localhost:8081). The serve script explicitly sets port 8081; the default in `vue.config.js` is still 8080, so other launch commands may conflict with the backend.

The development server proxies `/api` to `http://localhost:8080`. Change the proxy in [vue.config.js](vue.config.js) when using a different backend address.

### Build and source layout

```bash
npm run build
```

Output goes to `dist/`. Configure an `/api` reverse proxy for deployment; the development proxy is not included in the static build.

Page views live in `src/views/`, domain components in `src/components/`, routing and login checks in `src/router/`, and static assets in `public/`.

The project uses Vue Router, Axios, Chart.js / vue-chartjs, Tailwind CSS and Vue CLI 5.

## License

[Mulan PSL v2](LICENSE).
