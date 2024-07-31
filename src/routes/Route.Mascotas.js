import { Router } from "express";
import { actualizarAAdoptado, actualizarAEnAdopcion, actualizarAEnEspera, actualizarMascotas, buscarMascota, cargarFoto, HistorialMascota, listarMascotas, MisMascotas, registrarMascota } from "../controller/Mascota.controller.js";

const rutaMascotas=Router()

rutaMascotas.get("/listar",listarMascotas)
rutaMascotas.post("/registrar", cargarFoto,registrarMascota)
rutaMascotas.get("/buscar/:id", buscarMascota)
rutaMascotas.get("/historial/:id", HistorialMascota)
rutaMascotas.get("/mias/:id",MisMascotas)
rutaMascotas.put("/actualizar/:id",cargarFoto,actualizarMascotas)
rutaMascotas.put('/estadoEspera/:id', actualizarAEnEspera)
rutaMascotas.put('/estadoAdoptado/:id', actualizarAAdoptado)
rutaMascotas.put('/estadoEnAdopcion/:id', actualizarAEnAdopcion)


export default rutaMascotas