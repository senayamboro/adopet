import { Router } from "express";
import { actualizarUsuarios, buscarUsuario, listarUsuarios, registrarUsuario } from "../controller/User.Controller.js";

const rutauser =Router()

rutauser.get('/listar',listarUsuarios)
rutauser.post('/registrar',registrarUsuario)
rutauser.get('/buscar/:id',buscarUsuario)
rutauser.put('/actualizar/:id',actualizarUsuarios)


export default rutauser