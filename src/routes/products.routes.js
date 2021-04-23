import { Router } from "express"; 
const router = Router() 

import * as productsCtrl from "../controllers/products.controller";
import {authJwt} from "../middlewares";

router.get('/', productsCtrl.getProducts)

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById) // Put es para actualizar

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)

export default router;