import { Router } from "express";
import { validacion } from "../controller/Validacion.Controller.js";

const rutaValidacion = Router()

rutaValidacion.post('/validacion',validacion)

export default rutaValidacion