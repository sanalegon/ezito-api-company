import Product from "../models/Products";
import ProductType from "../models/ProductType"

export const createProduct = async (req, res) => {
    const {name, category, price, imgURL, productType} = req.body

    const newProduct = new Product({name, price, imgURL});

    if (ProductType) {
        const foundProductTypes = await ProductType.find({name: {$in: productType}})
        newProduct.productType = foundProductTypes.map(producttype => producttype._id)
    } else {
        const producttype = await ProductType.findOne({name: "Others"})
        newProduct.productType = [producttype._id]
    }
    
    const productSaved = await newProduct.save() // Como se guardara en la bd, tomara tiempo. Y como no quiero que la app pare para hacer eso, le pongo await
    
    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    }) 

    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    const {productId} = req.params;
    await Product.findByIdAndDelete(productId)
    
    res.status(204).json()
}