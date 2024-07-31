import { pool } from "../db/Conexion.js";


// registrar
export const registrarUsuario = async(req,res)=>{
    try {
        const {cedula,nombre, telefono, correo, rol,password} =req.body
        const sql = 'INSERT INTO usuarios (nombre, cedula, correo, telefono, rol, password) VALUES (?, ?, ?, ?, ?, ?)';
    const [resultado] = await pool.query(sql, [nombre, cedula, correo, telefono, rol, password]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        mensaje: "Usuario registrado con éxito"
      });
    } else {
      res.status(404).json({
        mensaje: "No se pudo registrar el usuario"
      });
    }
  } catch (error) {
    // Manejo de errores de claves únicas
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensaje: "Ya existe un usuario con esa cédula, correo o teléfono"
      });
    }

    // Otros errores del servidor
    res.status(500).json({
      mensaje: "Error del servidor: " + error.message
    });
  }
};
// Listar

export const listarUsuarios =async(req,res)=>{
    try {
        const sql = `SELECT * FROM usuarios`
        const [usuarios] = await pool.query(sql)

        if (usuarios.length>0) {
            res.status(200).json({usuarios})
        } else {
            res.staus(404).json({
                mensaje: 'No hay usauarios registrados '
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje:'Error en elservidor '+error
        })
    }
}

//buscar

export const buscarUsuario = async(req,res)=>{
    try {
        const {id} = req.params
        const consulta = `SELECT * FROM usuarios where id= ?`
        const [usuario] = await pool.query(consulta,[id])
        if (usuario.length > 0) {
            res.status(200).json({
                usuario
            })
        } else {
            res.status(404).json({
                mensaje: 'no hay usuarios con el id: '+id
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor '+error
        })
    }
}

//actualizar 

export const actualizarUsuarios = async(req,res)=>{
    try {
        const {id} =req.params
        const {cedula,nombre, telefono,rol, correo, password} =req.body
        const [usuarioAnterior] = await pool.query("SELECT * FROM usuarios where id = ?",[id])

        const [resultado] = await pool.query(
            `update usuarios set cedula='${cedula ? cedula : usuarioAnterior[0].cedula}', nombre='${nombre ? nombre : usuarioAnterior[0].nombre}', telefono='${telefono ? telefono : usuarioAnterior[0].telefono}',rol='${rol ? rol : usuarioAnterior[0].rol}',correo='${correo ? correo : usuarioAnterior[0].correo}',password='${password ? password : usuarioAnterior[0].password}' where id=? `,[id]
        ) 
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: "se actualizo el usuario con exito !!!"
            })
        } else {
            res.status(404).json({
                mensaje:'no se pudo actualizar el usuario '
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje:"Error del servidor "+error
        })
    }
}