import express from "express"
import morgan from 'morgan' // Middleware de express
import pkg from '../package.json' // Pkg: package. Nos lo traemos para poder importar la info de version, author, etc del programa

import { createRoles } from "./libs/initialSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes"; // Importamos las autenticaciones para poder usarlas. NECESARIO :V
import usersRoutes from "./routes/user.route";

const app = express() // ejecutamos la constante app, que va a aceptar la ejecucion de express
createRoles(); // Ejecutamos esto despues de que inicie express

app.set('pkg', pkg) // Forma de guardar una variable en express. Sirve en caso de que quiera guardar algo en otra ruta u otro achivo. Param 1: nombre con el que la guardare, Param 2: lo que guardare

app.use(express.json()); // Lo escribimos para que el programa pueda entender los objetos json (util para postman)

app.use(morgan('dev')); // Ejecutamos el middleware morgan y le decimos que vamos a estar en una version de desarrollo(dev)
// Lo que hace es que cada vez que yo visito la pagina, en la consola me mostrara lo que esta ocurriendo

// Creamos las rutas
// CUando pidan la ruta inicial, quiero que respondas:
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    }) // Muestra en la pagina web un string

})

// Usamos la ruta de products. Estan por Post (?
app.use('/api/products', productsRoutes) // Param 1: Decimos que todas la rutas del segundo param, siempre empezaran con /api/product
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes)

export default app; // Lo exportamos para que se habilite el poder usarlo en otros archivos como lo seria index.js