import Role from "../models/Role";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount() 

        if ( count > 0 ) return; // Regresa si no hay role creados. Osea, que no hagas nada werito

        // Se ejecutaran todas las promesas al mismo tiempo. Asi se gana tiempo 
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
        ]); // Mandamos un arreglo mas no un objeto

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}