import jwt from "jsonwebtoken"
import config from '../config'
import User from '../models/User'
import Role from "../models/User";

// Verificamos si se envia un token. Es un intermediaro entre funciones, si estas pasan, se hace nesxt (?
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]; // El header es un arreglo, tomamos la propiedas x access

        console.log(token)

        if(!token) return res.status.json({message: "not token provided"})

        // Extraemos lo que hay dentro del token. Verificamos el token del usuario con el secret. Config.secret me traera el valor de lo que esta dentro del token
        const decoded = jwt.verify(token, config.SECRET)

        req.userId = decoded.id; // En decoded, esta el valor del ID del usuario

        const user = await User.findById(req.userId, {password: 0}) // POnemos la pass en cero, porque al devolverme el objeto, ya no deberia usar la contrasena

        if (!user) return res.stuatus(404).json({message: 'no user found'})

        next() // EN: router.post('/', verifyToken, productsCtrl.createProduct), usamos el next para que pase de verifyToken a productsCtrl.createProduct

    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }    
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId) // Se conserva el id del usuario porque en decoded de arriba, lo guardamos en el req.userId. Y esta funcion lo tiene porque viene despues del verifyToken
    const roles = await Role.find({_id: {$in: user.roles}}) // Se buscara de todos los roles(find), por id (_id), de todos los roles aquel que que el id este incluido ($in) en user.roles. Buscamos todos los roles que cumplan con el id

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "moderator") {
            next()
            return; // Salimos del for
        }
    }
    
    return res.status(403).json({message: "Requiere Moderator role"})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId) // Se conserva el id del usuario porque en decoded de arriba, lo guardamos en el req.userId. Y esta funcion lo tiene porque viene despues del verifyToken
    const roles = await Role.find({_id: {$in: user.roles}}) // Se buscara de todos los roles(find), por id (_id), de todos los roles aquel que que el id este incluido ($in) en user.roles. Buscamos todos los roles que cumplan con el id

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next()
            return; // Salimos del for
        }
    }
    
    return res.status(403).json({message: "Requiere Admin role"})
}