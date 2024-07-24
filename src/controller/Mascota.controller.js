import { pool } from "../db/Conexion.js";
import multer from "multer"

const storage = multer.diskStorage({
  destination: function(req,file,cb){
     cb(null, "public/img")
  },
  filename:function(req,file,cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

export const cargarFoto = upload.single('foto')


//listar
export const listarMascotas = async(req,res)=>{
    try {
        const [respuesta] = await pool.query(`SELECT 
    m.mascota_id, 
    m.nombre_pet, 
    c.nombre_cate AS nombre_categoria, 
    m.genero,
    m.usuario_id,
    u.nombre AS nombre_usuario, 
    m.descripcion, 
    m.foto, 
    m.estado, 
    m.creado 
FROM 
    mascotas m 
    INNER JOIN categoria c ON m.categoria_id = c.cat_id 
    INNER JOIN usuarios u ON m.usuario_id = u.id;
`)
        if (respuesta.length>0) {
            res.status(200).json({
                respuesta
            })
        } else {
            res.status(404).json({
                mensaje:'No se encontraron mascotas registradas '
            })
            
        }
    } catch (error) {
        res.status(500).json({
            mensaje:'Error en el servidor '+error
        })
    }
}
//Registrar

export const registrarMascota =async(req,res)=>{
    try {
        const {nombre, categoria, genero, usuario,descripcion} = req.body
        let foto = req.file.originalname
        const sql = `INSERT INTO mascotas (nombre_pet,categoria_id,genero,usuario_id, descripcion, foto, estado) VALUES (?,?,?,?,?,?,1)`

        const [respuesta] = await pool.query(sql,[nombre, categoria, genero, usuario,descripcion,foto])

        if (respuesta.affectedRows > 0) {
            res.status(200).json({
                mensaje:"Se registro la mascota con exito "
            })
        } else {
            res.status(404).json({
                mensaje:'No se pudo registrar la mascota '
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error del servidor ' + error
        })
    }
}
//buscar por id

export const buscarMascota =async(req,res)=>{
    try {
        const {id} =req.params
        const sql = `SELECT m.mascota_id, m.nombre_pet, c.nombre_cate AS nombre_categoria,m.usuario_id, m.genero, u.nombre AS nombre_usuario, m.descripcion, m.foto, m.estado, DATE_FORMAT(m.creado, '%Y-%m-%d') AS creado FROM mascotas m  INNER JOIN categoria c ON m.categoria_id = c.cat_id  INNER JOIN usuarios u ON m.usuario_id = u.id  WHERE mascota_id = ?; `
        const [resultado] = await pool.query(sql,[id])
        if (resultado.length>0) {
            res.status(200).json({
                resultado
            })
        } else {
            res.status(404).json({
                mensaje:'No se encontraron mascotas con ese ID'
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje:'Error del servidor '+error
        })
    }
}

//listar por dueño 

export const MisMascotas = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `
            SELECT 
                m.mascota_id,
                m.nombre_pet,
                m.categoria_id,
                m.genero,
                m.descripcion,
                m.foto,
                m.estado,
                m.creado,
                u.nombre AS nombre_usuario
            FROM 
                mascotas m
            JOIN 
                usuarios u ON m.usuario_id = u.id
            WHERE
                m.usuario_id = ?
            ORDER BY 
                u.nombre;
        `;
        const [resultado] = await pool.query(sql, [id]);
        if (resultado.length > 0) {
            res.status(200).json({
                resultado
            });
        } else {
            res.status(404).json({
                mensaje: 'No se encontraron mascotas para este usuario'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error del servidor ' + error
        });
    }
};
//Actualizar 
export const actualizarMascotas = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, genero, usuario, descripcion, estado } = req.body;
        let foto = req.file ? req.file.originalname : null;

        // Obtener los datos actuales de la mascota
        const [mascotaAnterior] = await pool.query("SELECT * FROM mascotas WHERE mascota_id = ?", [id]);

        if (!mascotaAnterior.length) {
            return res.status(404).json({
                mensaje: "No se encontró ninguna mascota con el ID proporcionado",
            });
        }

        // Obtener la foto actual de la mascota
        let photo = mascotaAnterior[0].foto;
        if (foto) {
            photo = foto;
        }

        // Preparar los datos actualizados, utilizando los valores actuales si no se proporcionan nuevos
        const updatedNombrePet = nombre || mascotaAnterior[0].nombre_pet;
        const updatedCategoriaId = categoria || mascotaAnterior[0].categoria_id;
        const updatedGenero = genero || mascotaAnterior[0].genero;
        const updatedUsuarioId = usuario || mascotaAnterior[0].usuario_id;
        const updatedDescripcion = descripcion || mascotaAnterior[0].descripcion;
        const updatedEstado = estado || mascotaAnterior[0].estado;

        // Ejecutar la actualización en la base de datos
        const [resultado] = await pool.query(
            `UPDATE mascotas 
             SET nombre_pet = ?, 
                 categoria_id = ?, 
                 genero = ?, 
                 usuario_id = ?, 
                 descripcion = ?, 
                 foto = ?, 
                 estado = ? 
             WHERE mascota_id = ?`,
            [updatedNombrePet, updatedCategoriaId, updatedGenero, updatedUsuarioId, updatedDescripcion, photo, updatedEstado, id]
        );

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: `Se actualizó la mascota correctamente:`,
            });
            console.log(resultado);
        } else {
            res.status(500).json({
                mensaje: "No se pudo actualizar la mascota",
            });
        }
    } catch (error) {
        console.error("Error al actualizar la mascota: ", error);
        res.status(500).json({
            mensaje: "Error del servidor",
            error: error.message
        });
    }
};

