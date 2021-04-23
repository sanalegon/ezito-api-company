import Product from "../models/Products";

export const createProduct = async (req, res) => {
    // console.log(req.body) // Mostramos lo que el cliente esta mandando

    // Hacemos destructuring. Para no tener que que escribir: {name: req.body.name, category: req.body.category, etc}
    const {name, category, price, imgURL} = req.body

    // new Product({name: req.body.name, etc})
    const newProduct = new Product({name, category, price, imgURL});

    const productSaved = await newProduct.save() // Como se guardara en la bd, tomara tiempo. Y como no quiero que la app pare para hacer eso, le pongo await

    // Con status, le decimos al navegar el estado que esta ocurriendo. El 201 es que se ha creado con exito un producto
    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductById = async (req, res) => {
    // params es lo que se escribe en la url despues de /products
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    // Devuelve los datos del producto actualizado mas no el nuevo, pero con new true me da los datos actualizados
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    }) // Esto tomara un id y el nuevo dato a actualizar. Tambien esta findOneAndUpdate que busca algun dato por algun campo y luego lo actualiza

    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    //const deleteProduct = await Product.findByIdAndDelete(req.params.productId)
    const {productId} = req.params;
    await Product.findByIdAndDelete(productId)

    // Devolvemos al cliente (response, req: request) que todo se hizo de forma satisfactoria (204)
    res.status(204).json()
}