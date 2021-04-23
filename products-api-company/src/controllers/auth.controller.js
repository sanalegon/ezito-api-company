import User from "../models/User"
import jwt from "jsonwebtoken" // Modulo que le permitira entrar al user a una pagina u otra. Son tokens para darle permisos
import config from '../config.js' 
import Role from '../models/Role'

export const signUp = async (req, res) => {
    
    const { username, email, password, roles} = req.body;
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password) // Guardamos la pass cifrada y no de forma directa de lo que digito el usuario
    })

    // Si existe la propiedad roles (lo manda el usuario)
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}}) // Buscamos de todos los nombres(name) de las colecciones, si alguno de ellas(colecciones) existe el rol ingresado por el usuario. Osea, si el user necesita guardar a alguien con el rol admin, voy a buscar el rol admin en mi BD y deberia devolver el objeto de rol admin
        newUser.roles = foundRoles.map(role => role._id) // le decimos que mapee/recorra cada uno de los objetos de foundRoles, y por cada uno de ellos, quiero que me devuelvas su id. Guardamos en Role un monton de IDs
    } else {
        const role = await Role.findOne({name: "user"}) // Buscamos el role por defecto de "user". FindOne para que solo regrese un objeto ( si escribimos find, devuelve un arreglo completo)
        newUser.roles = [role._id] // A new user le asignamos la id del role user 
    }

    const savedUser = await newUser.save(); // Usamos await para no tener que usar promesas, ellas hacen lucir el codigo muy verboso
    console.log(savedUser)

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // Un dia en segundos
    }) // Param 1: Dato a guardar dentro del token. se suele usar el id, asi que lo tomaremos el id que guarda mongodb, Param 2: Palabra secreta para generar el token, Param 3: datos de configuracion

    res.status(200).json({token}) // Devolvemos el token al usuario
}

export const signin = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles") //con pupolate poblamos, recorremos los roles y vemos que hay adentro. Poblamos la propiedad roles. Asi, por ejemplo, cuando lo mostremos en console.log, nos mostrara no solo el id de roles, si no que todos sus campos. 

    if (!userFound) return res.json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    // console.log(userFound)

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token})
}