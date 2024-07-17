import { Router } from "express";
import { main } from "../controller/Cohere.Ia.js";

const rutaIA = Router()

rutaIA.post('/mensajeIA',main)

export default rutaIA;