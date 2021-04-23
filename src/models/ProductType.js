import { Schema, model } from "mongoose"

const productTypeSchema = new Schema({
    name: String
}, {
    versionKey: false
});

export default model('ProductType', productTypeSchema)