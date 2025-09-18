# go-stock-react
# GoStock - Inventory Management App

A full-stack **inventory and order management system** built with:

- ⚙️ **Backend**: Go (Golang) + MySQL, with Docker for containerization  
- 🌐 **Frontend**: React + TypeScript, Material UI  
- 📦 **Database Migrations**: Managed via SQL migrations  

## Features

- 🔑 User authentication & role-based access (Admin, Manager, Employee)  
- 📋 Product and Category management  
- 🛒 Order creation with product selection and reports  
- 📊 Excel report export (orders, products)  
- 🧑‍💻 Modern UI with Material UI and responsive design  

## Getting Started

### Prerequisites
- Docker & Docker Compose installed  
- Node.js (v18+)  
- Go (v1.24+)  

### Setup
1# 1. Clone the repository
git clone https://github.com/yourusername/gostock.git
cd gostock

# 2. Start the backend with Docker
docker-compose up --build

# 3. Open a new terminal, go to the frontend folder
cd frontend

# 5. Start the React dev server
pnpm run dev

# App URLs
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080


