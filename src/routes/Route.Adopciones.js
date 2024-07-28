import { Router } from "express";
import { buscarAdopciones, cambiarAAprovado, cambiarARechazado, listarAdopciones, registrarAdopciones } from "../controller/Adopciones.Controller.js";

const rutaAdopcion = Router()

rutaAdopcion.get("/listar",listarAdopciones)
rutaAdopcion.post("/registrar",registrarAdopciones)
rutaAdopcion.get('/buscar/:id',buscarAdopciones)
rutaAdopcion.put('/actualizarAprobado/:id',cambiarAAprovado)
rutaAdopcion.put('/actualizar/:id',cambiarARechazado)


export default rutaAdopcion;