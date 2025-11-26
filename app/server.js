const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
res.json({ message: 'Enterprise QA API' });
});

// Health endpoint
app.get('/health', (req, res) => {
res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});