# 🐾 PetStore – Fullstack E-Commerce App

A full-stack pet store e-commerce application with a **Spring Boot 3 REST API** backend and a **React + Vite + Tailwind CSS + Material UI** frontend.

---

## 🛠 Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Backend  | Java 17, Spring Boot 3, Spring Data JPA, Lombok |
| Database | PostgreSQL                                      |
| Frontend | React 18, Vite, Tailwind CSS v4, MUI v5, Axios  |
| Router   | React Router DOM v6                             |

---

## 📁 Project Structure

```
petstore/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/petstore/backend/
│   │   ├── BackendApplication.java
│   │   ├── DataSeeder.java
│   │   ├── controller/      PetController, HealthController
│   │   ├── model/           Pet.java
│   │   ├── repository/      PetRepository.java
│   │   ├── service/         PetService.java
│   │   └── exception/       GlobalExceptionHandler, ResourceNotFoundException
│   └── src/main/resources/application.properties
└── frontend/                # React Vite App
    └── src/
        ├── api/             petApi.js (Axios client)
        ├── components/      Navbar, PetCard, PetModal
        └── pages/           GalleryPage, AdminPage
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- PostgreSQL 14+
- Node 18+

### 1. Database Setup

```sql
CREATE DATABASE petstore;
-- Default credentials: postgres / postgres (edit application.properties if different)
```

### 2. Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
# API available at http://localhost:8080
```

### 3. Frontend

```powershell
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

---

## 🔗 REST API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/pets`                  | List all pets (filter: species, status) |
| GET    | `/api/pets/{id}`             | Get pet by ID                        |
| POST   | `/api/pets`                  | Create new pet                       |
| PUT    | `/api/pets/{id}`             | Update pet                           |
| DELETE | `/api/pets/{id}`             | Delete pet                           |
| GET    | `/api/health`                | Health check                         |

### Filter Examples
```
GET /api/pets?species=Dog
GET /api/pets?status=AVAILABLE
GET /api/pets?species=Cat&status=RESERVED
```

---

## ✨ Features

- **Product Gallery** – responsive grid with species & status filters + live search
- **Admin Panel** – full CRUD with stats dashboard, add/edit modal, delete confirm dialog
- **Dark Theme** – premium neo-brutalist design with glassmorphism
- **Data Seeding** – 8 sample pets seeded automatically on first run
- **Input Validation** – both backend (Bean Validation) and frontend
- **CORS** – pre-configured for Vite dev server

---

## 👤 Author

Robert Velasco
