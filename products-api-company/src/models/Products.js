import { Schema, model } from "mongoose" // Schema: Para poder definir el modelo, model: Para poder interactuar con la BD

// Decimos que campos guardaremos en la BD
const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
}, {
    timestamps: true, // Para que se cree automaticamente la info de cuando fue creado y cuando fue la ultima vez que fue modificado
    versionKey: false // Para que no aparez __v
}) // Aqui adicionames unas secciones extras a la coleccion

export default model('Product', productSchema) // Lo exportamos para usar el esquema en el codigo. Pero no exportaremos un esquema si no un modelo, por eso usamos funcion model(). Param: nombre, Param 2: en que se basa 