const express = require('express');
const winston = require('winston');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example MCP endpoint
app.post('/mcp/command', (req, res) => {
  const { command } = req.body;
  logger.info('Received MCP command', { command });
  
  // TODO: Implement actual MCP command handling
  res.json({
    status: 'received',
    command,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  logger.info(`MCP Server is running on port ${port}`);
}); 