import { pool } from '../db/Conexion.js'
import jwt from 'jsonwebtoken'

export const validacion = async(req,res)=>{
    try {
        const {correo,password} = req.body
        const sql = `select * from usuarios where correo = '${correo}' and password='${password}'`
        const [user] = await pool.query(sql)

        if (user.length>0) {
            let token = jwt.sign({user}, 'jasdkladsasdasdasd',{expiresIn:'2h'})

            return res.status(200).json({'usuario':user,
                'token':token
            })
        } else {
            res.status(404).json({
                'status ': 404,
                'mensaje ': 'Usuario no autorizado'
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error del servidor '+error
        })
    }
}

export const validarToken = async(req,res)=>{
    try {
        let tokenClient = req.headers['token']
        if (!tokenClient) {
            return res.status(404).json({
                mensaje: 'Token es requerido '
            })
        } else {
            const token = jws.verify(tokenClient, 'jasdkladsasdasdasd', (error, decoded)=>{
                if (error) {
                    return res.status(403).json({
                        mensaje:'El token ya expiro'
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({

            status:500, mensaje: 'Error del servidor '+error
        })
    }
}