# Frontend Module Documentation

This document serves as a comprehensive technical guide for the RideConnect Frontend module. It details the architecture, assigned technology stack, project structure, and developer guidelines suited for an industry-standard production environment.

## 1. Project Overview & Technology Stack

The frontend is a modern Single Page Application (SPA) designed for performance and scalability, built using the **Vite** build tool.

### Core Technologies
-   **Framework**: [React 19](https://react.dev/) - Utilizing the latest Concurrent features and Server Components readiness.
-   **Build Tool**: [Vite](https://vitejs.dev/) - Ultra-fast development server and optimized build process.
-   **Routing**: [React Router DOM v7](https://reactrouter.com/) - Client-side routing for seamless navigation.
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
-   **Language**: JavaScript (ES Modules).

## 2. Project Architecture & Structure

The project follows a **Feature-based** or **Domain-driven** folder structure rather than a generic "type-based" structure. This ensures better scalability as the application grows.

### Directory Layout
```text
Frontend/
└── rideconnect/
    ├── public/              # Static assets (images, favicon, etc.)
    ├── src/
    │   ├── assets/          # Source-level assets (imported images, styles)
    │   ├── components/      # UI Components organized by Domain
    │   │   ├── CaptainComp/ # Components specific to Captain portal
    │   │   ├── CustomerComp/# Components specific to Customer portal
    │   │   └── Pages/       # Page-level components (Route targets)
    │   ├── App.jsx          # Main Application Component & Routing Configuration
    │   ├── main.jsx         # Application Entry Point (DOM Rendering)
    │   └── index.css        # Global Styles & Tailwind Directives
    ├── package.json         # Dependency manifest & scripts
    ├── vite.config.js       # Vite configuration
    └── eslint.config.js     # Linting rules
```

### Component Hierarchy
The application is split into distinct user flows:
1.  **Public/Shared**: Landing pages (`Home`).
2.  **Customer Portal**: Dedicated authentication and dashboards for riders (`CustomerComp`).
3.  **Captain Portal**: Dedicated authentication and dashboards for drivers (`CaptainComp`).

## 3. Setup & Installation

Follow these steps to set up the development environment.

### Prerequisites
-   **Node.js**: v18.0.0 or higher.
-   **npm**: Included with Node.js.

### Installation Instructions
1.  Navigate to the project directory:
    ```bash
    cd Frontend/rideconnect
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Available Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server (usually at `http://localhost:5173`). |
| `npm run build` | Compiles the application for production deployment into the `dist` folder. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## 4. Routing Strategy

Routing is managed via `react-router-dom` in `src/App.jsx`. The application utilizes a centralized route definition approach.

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `<Home />` | The main landing page. |
| `/captain/login` | `<CaptainLogin />` | Driver login interface. |
| `/captain/signup` | `<CaptainSignUp />` | Driver registration interface. |
| `/customer/login` | `<CustomerLogin />` | Rider login interface. |
| `/customer/signup` | `<CustomerSignUp />` | Rider registration interface. |

## 5. Development Standards & Best Practices

To maintain code quality and industry standards, the following practices are enforced:

-   **Functional Components**: All components are written as functional components using React Hooks.
-   **Module Imports**: implementation uses ES6 `import`/`export` syntax.
-   **Utility-First Styling**: All styling is applied using Tailwind CSS utility classes. Custom CSS in `index.css` is minimal and reserved for global resets or complex animations.
-   **Linting**: ESLint is configured to catch common React patterns and potential errors (`eslint-plugin-react-hooks`, etc.).

## 6. Future Scalability Considerations

-   **State Management**: For complex global state (like user session data shared across the app), considered integrating **Context API** or a library like **Redux Toolkit** or **Zustand** as the app grows.
-   **API Integration**: API calls should be abstracted into a separate `services/` or `api/` directory (e.g., using Axios or Fetch) to decouple UI from data fetching logic.
-   **Authentication**: Implementing Protected Routes (Higher-Order Components or Wrappers) to secure dashboards for Captains and Customers.
