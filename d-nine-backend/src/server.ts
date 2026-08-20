import 'dotenv/config';

import { app } from './app.js';

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '0.0.0.0';

const server = app.listen(port, host, () => {
  console.log(`D-NINE Backend is running at http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error('Failed to start D-NINE Backend:', error);
  process.exit(1);
});