# Dummy MCP Server

A dummy Master Control Program (MCP) server written in TypeScript that can be connected to a Slack bot. This server provides a basic framework for handling MCP commands and can be extended based on specific requirements.

## Features

- Express.js server with TypeScript support
- Winston logging setup
- Environment-based configuration
- Ready for Slack bot integration
- Error handling middleware
- Health check endpoint
- Type-safe development

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=3000
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-token
LOG_LEVEL=info
```

3. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 (or the port specified in your .env file).

## Available Scripts

- `npm run build`: Build the TypeScript code to JavaScript
- `npm start`: Start the production server (requires build first)
- `npm run dev`: Start the development server with hot reload and TypeScript compilation
- `npm test`: Run tests

## API Endpoints

- `GET /health`: Health check endpoint
- `POST /mcp/command`: Endpoint for receiving MCP commands

## Project Structure

```
dummy-mcp-server/
├── src/
│   └── server.ts
├── dist/ (generated)
├── logs/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Development

The project uses TypeScript for type safety. The source files are in the `src/` directory and are compiled to JavaScript in the `dist/` directory.

For development, use `npm run dev` which will automatically restart the server when you make changes to the TypeScript files.

For production, first build the project with `npm run build` and then start it with `npm start`.

## Future Enhancements

- Slack bot integration
- Command handling system
- Authentication and authorization
- Additional MCP endpoints
- Test coverage 