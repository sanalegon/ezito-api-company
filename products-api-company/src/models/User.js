import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                // Un usuario puede tener multiples roles - 1 a M
                ref: "Role",   // ref es para decir que tiene una referencia/relacion con otro modelo de datos
                type: Schema.Types.ObjectId // Lo relacionamos a traves de la ID. Es decir, lo que se guardara en user de role sera su object id
            },
        ], // Relacionamos con el model Roles
    },  
    {
        timestamps: true,
        versionKey: false 
    }
);

// Metodo para cifrar y comparar contrasenas. Se compararan ya que se planea comparar su vieja pass con la que este tipeando
// Statics hace referencia a crear metodos estaticos. SOn formas de llamar un objeto, sin la necesidad de instanciar un objeto
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // Cuantas veces voy a aplicar el algoritmo de encriptacion
    return await bcrypt.hash(password, salt) // Se crea un hash, una contraseña cifrada
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword) // Retorna true si las contrasenas coinciden
}

export default model('User', userSchema)