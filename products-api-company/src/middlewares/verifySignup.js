import ROLES from '../models/Role' // En vez de esto, podria hacer una consulta a la bd para que sea mas automatizada
import User from '../models/User'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if (user) return res.status(400).json({message: 'The user already exists'})

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: 'The email already exists'})

    next()
}

// Comprobamos que el usuario este creando un user con un rol existente
export const checkRolesExisted = (req, res, next) => {
    console.log('inside of checkroles')
    // Si el rol pasado existe
    if (res.body.roles) {
        console.log('if')
        for (let i = 0; i < req.body.roles.length; i++) {
            console.log('for {i}')
            // Verifico si existe los roles. Si incluye lo que pasa el usuario en request
            if(!ROLES.include(req.body.roles[i])){
                console.log(req.body.roles[i])
                return res.status(400).json({
                    // Concatenacion
                    message: 'Role ${req.body.roles[i]} does not exists'
                })
            }
        }
    }    

    // Si existe el rol, continuara
    next()
}