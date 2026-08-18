import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = [
  API_BASE_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB successfully');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
}

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', username: 'adal' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', username: 'graceh' },
  { id: 3, name: 'Linus Torvalds', email: 'linus@example.com', username: 'linust' }
];

const activities = [
  { id: 1, type: 'Run', duration: 30, calories: 240, date: '2026-08-18' },
  { id: 2, type: 'Strength', duration: 45, calories: 310, date: '2026-08-17' },
  { id: 3, type: 'Cycling', duration: 60, calories: 420, date: '2026-08-16' }
];

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', apiBaseUrl: API_BASE_URL, timestamp: new Date().toISOString() });
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/api/users/', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/api/activities', (req: Request, res: Response) => {
  res.json(activities);
});

app.get('/api/activities/', (req: Request, res: Response) => {
  res.json(activities);
});

// Start server
async function startServer() {
  await connectToDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✓ Server running at ${API_BASE_URL}\n`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
