import {Router} from 'express'
import { obtenerMensajes} from '../controller/WebSocketController.js'


const rutaMensaje = Router()

rutaMensaje.get('/mensaje/:id_receptor/:id_envia/:foto',obtenerMensajes)

export default rutaMensaje