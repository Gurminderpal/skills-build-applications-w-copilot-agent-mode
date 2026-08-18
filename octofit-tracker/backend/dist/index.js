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
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
// Middleware
app.use((0, cors_1.default)());
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
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'OctoFit Tracker API' });
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Start server
async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`\n✓ Server running at http://localhost:${PORT}\n`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
exports.default = app;
