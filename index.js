import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import body_parser from 'body-parser';
import cors from 'cors';
import rutauser from './src/routes/Route.User.js';
import rutaValidacion from './src/routes/Validacion.Router.js';
import rutaMascotas from './src/routes/Route.Mascotas.js';
import rutaCategoria from './src/routes/Route.Categoria.js';
import { handleConnection } from './src/controller/WebSocketController.js';
import rutaMensaje from './src/routes/Route.Mensaje.js';
import rutaIA from './src/routes/Router.ia.js';
import { PORT } from './config.js';

const app = express();
const port = PORT;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extend: false }));

app.use(cors());

const server = createServer(app);
const io = new Server(server);

// Usar el controlador para manejar las conexiones WebSocket
handleConnection(io);

app.use('/usuario', rutauser);
app.use('/mascotas', rutaMascotas);
app.use('/categoria', rutaCategoria);
app.use(rutaMensaje)
app.use(rutaIA)
app.use(rutaValidacion);

// servidor.set('views', './views')

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.status(200).json('Hello World ' + port);
});

server.listen(port, () => {
  console.log(`Servidor corriendo por el puerto ${port}`);
});
