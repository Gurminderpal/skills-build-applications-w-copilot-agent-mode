"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✓ Connected to MongoDB successfully');
    }
    catch (error) {
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
app.get('/', (req, res) => {
    res.json({ message: 'OctoFit Tracker API', apiBaseUrl: API_BASE_URL });
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', apiBaseUrl: API_BASE_URL, timestamp: new Date().toISOString() });
});
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.get('/api/users/', (req, res) => {
    res.json(users);
});
app.get('/api/activities', (req, res) => {
    res.json(activities);
});
app.get('/api/activities/', (req, res) => {
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
exports.default = app;
