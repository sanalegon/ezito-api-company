import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: String,
    price: Number,
    imgURL: String,
    productType: [
        {
            ref:"ProductType",
            type: Schema.Types.ObjectId 
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)