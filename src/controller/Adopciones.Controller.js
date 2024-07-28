import { pool } from "../db/Conexion.js";

// listarAdopciones
export const listarAdopciones = async (req, res) => {
    try {
        const sql = `SELECT 
    a.adoption_id,
    a.pet_id,
    a.usuario_id,
    a.fundacion_id,
    a.adopcion_date,
    a.status,
    m.nombre_pet AS nombre,
    m.foto AS imagen
FROM adopciones a
JOIN mascotas m ON a.pet_id = m.mascota_id
`;
        const [resultado] = await pool.query(sql);
        if (resultado.length > 0) {
            res.status(200).json({
                resultado
            });
        } else {
            res.status(404).json({
                mensaje: 'No se encontraron adopciones'
            });
        }
    } catch (error) {
        console.error('Error al listar adopciones:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor'
        });
    }
};

// registrarAdopciones
export const registrarAdopciones = async (req, res) => {
    try {
        const { pet_id, usuario_id, fundacion_id } = req.body;
        const sql = `INSERT INTO adopciones (pet_id, usuario_id, fundacion_id, status) VALUES (?, ?, ?, 1)`;
        const [resultado] = await pool.query(sql, [pet_id, usuario_id, fundacion_id]);
        
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: 'Se registró la adopción con éxito!'
            });
        } else {
            res.status(400).json({
                mensaje: 'No se registró la adopción'
            });
        }
    } catch (error) {
        console.error('Error al registrar adopciones:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor'
        });
    }
};

// buscarAdopciones
export const buscarAdopciones = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT 
    a.adoption_id,
    a.pet_id,
    a.usuario_id,
    a.fundacion_id,
    a.adopcion_date,
    a.status,
    m.nombre_pet AS nombre,
    m.foto AS imagen
FROM adopciones a
JOIN mascotas m ON a.pet_id = m.mascota_id WHERE a.fundacion_id = ? or a.usuario_id=?`;
        const [resultado] = await pool.query(sql, [id,id]);
        
        if (resultado.length > 0) {
            res.status(200).json({
                resultado
            });
        } else {
            res.status(404).json({
                mensaje: 'No se encontraron adopciones'
            });
        }
    } catch (error) {
        console.error('Error al buscar adopciones:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor'
        });
    }
};
// cambiar a aprovado

export const cambiarAAprovado = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `UPDATE adopciones SET status = 2 WHERE adoption_id = ? AND status = 1`;
        const [resultado] = await pool.query(sql, [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: 'El estado de la adopción se actualizó con éxito!'
            });
        } else {
            res.status(404).json({
                mensaje: 'No se encontró una adopción con estado 1 o no se pudo actualizar'
            });
        }
    } catch (error) {
        console.error('Error al cambiar el estado de la adopción:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor'
        });
    }
};

// cambiar a rechazado 
export const cambiarARechazado = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `UPDATE adopciones SET status = 3 WHERE adoption_id = ? AND status = 1`;
        const [resultado] = await pool.query(sql, [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: 'El estado de la adopción se actualizó con éxito!'
            });
        } else {
            res.status(404).json({
                mensaje: 'No se encontró una adopción con estado 1 o no se pudo actualizar'
            });
        }
    } catch (error) {
        console.error('Error al cambiar el estado de la adopción:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor'
        });
    }
};
