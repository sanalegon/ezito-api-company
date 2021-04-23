import { Router } from "express"; // traemos el modulo router
const router = Router() // Inicializamos el router

import * as productsCtrl from "../controllers/products.controller"; // { createProduct, getProducts, etc} es los mismo que * as productCtrl Aqui decimos que importe TODO
import {authJwt} from "../middlewares";

// Lo que se ejecutara al entrar en /products ==> cambio por como se usa el app.use en app.js. Se declaro que todo empezara en esta ruta con /products. Asi que con solo escribir / es suficiente, ya que todo sera precedido a / con /products
router.get('/', productsCtrl.getProducts) // Obtenemos todos los productos de la BD

// Esta en arreglo, porque quiero ejecutar varios middlewares
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct) // Para crear usamos post

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById) // Put es para actualizar

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)

export default router; // para exportarlo 