import { pool } from "../db/Conexion.js";


//listar categoria
export const registrarCategoria =async(req,res)=>{
    try {
        const {nombre}= req.body
        const [categoria] = await pool.query(`SELECT nombre_cate FROM categoria where nombre_cate=?`,[nombre])
        if (categoria.length>0) {
            res.status(403).json({
                mensaje:'Esa catregoria ya esta en el sistema '
            })
        } else {
            const sql = `INSERT INTO categoria (nombre_cate) VALUES (?)`
        const [resultado]= await pool.query(sql,[nombre])
        if (resultado.affectedRows>0) {
            res.status(200).json({
                mensaje:'La categoria fue rregistrada con exito !!!'
            })
        } else {
            res.status(404).json({
                mensaje:'No se pudo registrar la categoria '
            })
        }
        }

    } catch (error) {
        res.status(500).json({
            mensaje:'Error de servidor'+error
        })
    }
}


export const listarCategoria = async (req,res)=>{
    try {
        const [resultado] = await pool.query(`SELECT * FROM categoria`)
        if (resultado.length>0) {
            res.status(200).json({
                resultado
            })
        } else {
            res.status(404).json({
                mensaje:'No se encontraron categorias'
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje:"Error del servidor "+error
        })
    }
}