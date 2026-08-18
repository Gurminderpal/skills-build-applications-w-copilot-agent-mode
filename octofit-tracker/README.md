# OctoFit Tracker - Modern Multi-Tier Application

A modern full-stack fitness tracking application built with React 19 (Vite), Node.js/Express, TypeScript, and MongoDB.

## 🏗️ Architecture

### Frontend (React 19 + Vite)
- **Port**: 5173
- **Location**: `octofit-tracker/frontend`
- **Stack**: React 19, Vite, Oxlint

### Backend (Node.js + Express)
- **Port**: 8000
- **Location**: `octofit-tracker/backend`
- **Stack**: Node.js, Express, TypeScript, Mongoose

### Database (MongoDB)
- **Port**: 27017
- **Default Database**: `octofit-tracker`

## 📋 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- MongoDB (running on localhost:27017 or configured via MONGODB_URI)

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd octofit-tracker/backend

# Install dependencies
npm install

# Create .env file (or use the provided .env.example as template)
cp .env.example .env

# Start the development server
npm run dev
```

The backend will be available at `http://localhost:8000`

**Available Scripts:**
- `npm run dev` - Start with hot reload using nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled JavaScript

### 2. Frontend Setup

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Create .env file (or use the provided .env.example as template)
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
octofit-tracker/
├── frontend/                 # React 19 + Vite application
│   ├── src/
│   ├── .env                 # Frontend environment variables
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── vite.config.js
└── backend/                 # Express + TypeScript application
    ├── src/
    │   ├── index.ts         # Main server file
    │   ├── config/          # Configuration files
    │   └── scripts/         # Utility scripts
    ├── dist/                # Compiled JavaScript (generated)
    ├── .env                 # Backend environment variables
    ├── .env.example         # Environment template
    ├── tsconfig.json        # TypeScript configuration
    └── package.json
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## 🗄️ Database

The application uses MongoDB for data persistence. Ensure MongoDB is running before starting the backend.

### Default Connection
- **URL**: `mongodb://localhost:27017/octofit-tracker`
- **Database**: `octofit-tracker`

To use a different MongoDB instance, update the `MONGODB_URI` in the `.env` file.

## 🛠️ Development Workflow

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd octofit-tracker/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd octofit-tracker/frontend
npm run dev
```

**Terminal 3 - MongoDB (if local):**
```bash
mongod
```

### Testing the Connection

- Visit frontend: `http://localhost:5173`
- Visit backend health check: `http://localhost:8000/health`
- View API root: `http://localhost:8000`

## 📦 Backend Dependencies

**Production:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

**Development:**
- `typescript` - JavaScript superset
- `@types/node` - Node.js type definitions
- `@types/express` - Express type definitions
- `@types/cors` - CORS type definitions
- `ts-node` - TypeScript execution
- `nodemon` - Auto-reload on file changes

## 📦 Frontend Dependencies

- `react` - UI framework
- `vite` - Build tool
- `oxlint` - JavaScript linter

## 🔌 API Endpoints

### Health Check
- `GET /health` - Returns server health status

### Root Endpoint
- `GET /` - Returns API information

## 📝 Building for Production

### Backend
```bash
cd octofit-tracker/backend
npm run build
npm run start
```

### Frontend
```bash
cd octofit-tracker/frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running on localhost:27017
- Check the `MONGODB_URI` environment variable
- Verify MongoDB user permissions

### Port Already in Use
- Change the port in the `.env` file
- Or kill the process using the port (e.g., `lsof -i :8000`)

### Module Not Found
- Run `npm install` in the respective directory
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📄 License

See LICENSE file for details.

---

**Happy coding! 🎉**
