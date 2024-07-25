// src/controllers/WebSocketController.js
import { pool } from '../db/Conexion.js';

export const handleConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);

    socket.on('chat message', (msg) => {
      console.log('Mensaje recibido: ' + msg);

      const { userEnvia_id, userRecibe_id,name_foto,nameUserEnv, message } = msg;
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const query = 'INSERT INTO chat (userEnvia_id, userRecibe_id,name_foto, nameUserEnv, message, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
      pool.query(query, [userEnvia_id, userRecibe_id,name_foto, nameUserEnv, message, timestamp], (err, result) => {
        if (err) {
          console.error('Error al insertar el mensaje en la base de datos:', err);
          return;
        }
        console.log('Mensaje almacenado en la base de datos');
      });

      io.emit('chat message', { userId: socket.id, message: msg.message });
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado', socket.id);
    });
  });
};

export const obtenerMensajes = async (req, res) => {
  try {
    const { id_receptor, id_envia, foto } = req.params;

    const sql = `
      SELECT message, nameUserEnv, timestamp 
      FROM chat 
      WHERE 
        (userEnvia_id = ? or userRecibe_id = ? AND name_foto = ?)
      ORDER BY timestamp ASC
    `;

    const [result] = await pool.query(sql, [id_envia, id_receptor, foto, id_receptor, id_envia, foto]);

    if (result.length > 0) {
      res.status(200).json({
        result,
      });
    } else {
      res.status(404).json({
        mensaje: "No se encontraron mensajes para esta foto y usuarios",
      });
    }
  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({
      mensaje: "Error del servidor: " + error.message,
    });
  }
};
