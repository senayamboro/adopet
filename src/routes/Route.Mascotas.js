import { Router } from "express";
import { actualizarMascotas, buscarMascota, cargarFoto, listarMascotas, MisMascotas, registrarMascota } from "../controller/Mascota.controller.js";

const rutaMascotas=Router()

rutaMascotas.get("/listar",listarMascotas)
rutaMascotas.post("/registrar", cargarFoto,registrarMascota)
rutaMascotas.get("/buscar/:id", buscarMascota)
rutaMascotas.get("/mias/:id",MisMascotas)
rutaMascotas.put("/actualizar/:id",cargarFoto,actualizarMascotas)

export default rutaMascotas