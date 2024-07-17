import { Router } from "express";
import { listarCategoria, registrarCategoria } from "../controller/Categoria.Controller.js";

const rutaCategoria = Router()

rutaCategoria.post("/registrar",registrarCategoria)
rutaCategoria.get("/listar",listarCategoria)

export default rutaCategoria