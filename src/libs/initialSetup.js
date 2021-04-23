import ProductType from "../models/ProductType" 
import Role from "../models/Role";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount() 

        if ( count > 0 ) return;
        
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
        ]); 

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}

export const createProductType = async () => {
    try {
        const count = await ProductType.estimatedDocumentCount() 
        if ( count > 0 ) return;
        const values = await Promise.all([
            new ProductType({name: 'Others'}).save(),
            new ProductType({name: 'Desktop Computers'}).save(),
            new ProductType({name: 'Laptops'}).save(),
            new ProductType({name: 'Food'}).save(),
            new ProductType({name: 'Gadgets'}).save(),
            new ProductType({name: 'Clothes'}).save(),
        ]);
    } catch (error) {
        console.log(error)
    }
}
