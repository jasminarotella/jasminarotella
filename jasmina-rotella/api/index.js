// api/index.js
import serverless from 'serverless-http';
import app from '../server.js'; // importa la tua app Express

export default serverless(app);
