import { Router } from "express";
import { buscarMascota, cargarFoto, listarMascotas, registrarMascota } from "../controller/Mascota.controller.js";

const rutaMascotas=Router()

rutaMascotas.get("/listar",listarMascotas)
rutaMascotas.post("/registrar", cargarFoto,registrarMascota)
rutaMascotas.get("/buscar/:id", buscarMascota)

export default rutaMascotas