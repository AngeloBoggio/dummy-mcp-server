import express, { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
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

// Interface for MCP command request
interface McpCommandRequest extends Request {
  body: {
    command: string;
  };
}

// Interface for error object
interface ErrorWithStack extends Error {
  stack?: string;
}

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example MCP endpoint
app.post('/mcp/command', (req: McpCommandRequest, res: Response): void => {
  const { command } = req.body;
  
  if (!command) {
    res.status(400).json({ 
      error: 'Command is required',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  logger.info('Received MCP command', { command });
  
  // TODO: Implement actual MCP command handling
  res.json({
    status: 'received',
    command,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: ErrorWithStack, req: Request, res: Response, next: NextFunction): void => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, (): void => {
  logger.info(`MCP Server is running on port ${port}`);
}); 