# Frontend Folder Structure Guide

## Overview

This project follows a **Domain-Driven Feature Architecture** combined with a **shared infrastructure approach**. The main goal is to keep the codebase scalable as the application grows.

Instead of organizing files strictly by technical type:

```
components/
services/
hooks/
stores/
```

We organize business features together:

```
modules/
├── auth/
├── employees/
├── jobs/
└── departments/
```

Each business domain owns its components, API communication, state management, validation schemas, types, and core business logic. This keeps related code together and prevents the project from becoming monolithic or difficult to maintain.

---

## Architecture Principles

### 1. Domain-First Organization

Business features must live inside `src/modules/`.

```
src/modules/employees/
├── api/
├── components/
├── composables/
├── schemas/
├── stores/
└── types.ts
```

Everything directly related to employees stays strictly inside the employee domain.

### 2. Separation of Responsibilities

Each layer has a clear single responsibility:

```
Component  -->  Composable  -->  API Service  -->  Backend API
```

Data flow example:

```
EmployeeTable.vue
       ↓
useEmployees.ts
       ↓
employee.api.ts
       ↓
GET /employees
```

> **Rule:** Components should never call external APIs directly. They must delegate to composables or API modules.

---

## Folder Structure Summary

```
src/
├── api/
├── app/
├── assets/
├── components/
├── layouts/
├── modules/
├── pages/
├── router/
├── stores/
├── types/
└── utils/
```

---

## Directory Breakdown

### api/

**Purpose:** Global API infrastructure and client configuration. Manages communication setup rather than specific business logic.

```
api/
├── axios.ts
└── endpoint.ts
```

- **axios.ts:** Axios instance configuration (base URL, default headers, request/response interceptors, global error handling).
- **endpoint.ts:** Global API endpoint paths and constants.

> **Note:** Feature-specific API calls must stay inside their respective `modules/` folder.

---

### app/

**Purpose:** Application bootstrapping and global setup.

```
app/
└── main.ts
```

**Responsibilities:**

- Creating the core Vue application instance
- Registering plugins, Pinia stores, Vue Router, and TanStack Query
- Mounting global configs

---

### assets/

**Purpose:** Uncompiled static assets and global styles.

```
assets/
├── icons/
├── images/
└── styles/
```

---

### components/

**Purpose:** Shared, domain-agnostic UI components.

```
components/
└── shared/
    ├── BaseButton.vue
    ├── BaseModal.vue
    └── DataTable.vue
```

> **Do Not Put:** Feature-specific components like `EmployeeTable.vue` or `LoginForm.vue` here. Those belong directly inside their respective modules.

---

### layouts/

**Purpose:** Application frame structures and page wrappers.

```
layouts/
├── AuthLayout.vue
└── DashboardLayout.vue
```

- **AuthLayout.vue:** Used for unauthenticated pages (Login, Register, Forgot Password).
- **DashboardLayout.vue:** Used for authenticated main views (Sidebar, Top Navigation, Footer).

---

### modules/

**Purpose:** Core business domains. This is the heart of the application.

```
modules/
├── auth/
├── employees/
└── jobs/
```

#### Module Anatomy Example (`modules/employees/`)

| Folder / File      | Purpose                                                                                   |
| :----------------- | :---------------------------------------------------------------------------------------- |
| **`api/`**         | Domain-specific endpoint calls (`employee.api.ts`).                                       |
| **`components/`**  | UI components used strictly within this domain (`EmployeeTable.vue`, `EmployeeForm.vue`). |
| **`composables/`** | Custom business logic, state composition, and TanStack Query hooks (`useEmployees.ts`).   |
| **`schemas/`**     | Validation schemas (Zod, VeeValidate) for domain forms and payloads.                      |
| **`stores/`**      | Domain-specific client state using Pinia (`auth.store.ts`).                               |
| **`types.ts`**     | Domain TypeScript interfaces and types (`Employee`, `EmployeeRole`).                      |
| **`index.ts`**     | Public API contract for the module (exports what other modules are allowed to use).       |

---

### pages/

**Purpose:** Route-level view components.

```
pages/
└── Employees.vue
```

Pages act as pure orchestrators:

```
Page  -->  Module Components
```

> **Rule:** Keep pages thin. Avoid placing API calls, complex business logic, or heavy templating directly inside a page file.

---

### router/

**Purpose:** Routing configuration and navigation guards.

```
router/
├── index.ts
└── guard.ts
```

- **index.ts:** Route definitions and layout mapping.
- **guard.ts:** Navigation guards (authentication checks, role-based access control).

---

### stores/

**Purpose:** Global application state _only_.

```
stores/
└── app.store.ts
```

- **Allowed:** UI themes, sidebar collapse state, application-wide user preferences.
- **Forbidden:** Server collections like `employees[]` or `jobs[]`. These must be managed by **TanStack Query**.

---

### types/

**Purpose:** Shared, non-domain-specific TypeScript definitions.

```
types/
├── api.ts
└── common.ts
```

Contains generic API response wrappers (`ApiResponse<T>`), common primitives, and global helper types.

---

### utils/

**Purpose:** Pure JavaScript/TypeScript utility functions.

```
utils/
├── format.ts
└── constants.ts
```

> **Rule:** A utility function must be stateless and completely detached from Vue reactivity or runtime context.
>
> - **Bad:** `useEmployeeFormatter()`
> - **Good:** `formatDate(date: Date): string`

---

## State Management Standard

| Tool               | State Type        | Best Used For                                                                      |
| :----------------- | :---------------- | :--------------------------------------------------------------------------------- |
| **Pinia**          | Client / UI State | Authentication tokens, active user profile, UI preferences, modal toggles.         |
| **TanStack Query** | Server State      | Remote data fetching, caching, invalidation, mutations (Employees, Jobs, Reports). |

---

## Scaling Strategy & Core Rule

When adding new code to the repository, ask:

> **"Is this functionality strictly required by more than one unrelated domain?"**

- **Yes:** Move it to global infrastructure (`src/components/`, `src/utils/`, `src/types/`).
- **No:** Keep it isolated inside `src/modules/{domain}/`.
