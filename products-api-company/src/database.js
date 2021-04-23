import mongoose from "mongoose"

// Te conectaras por medio del protocolo mongodb al localhost y tendra el nombre ...
mongoose.connect("mongodb://Localhost/companydb" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}) // El segundo param son unas medidas de seguridad que me pide el compilador
    .then(db => console.log('Db is connected')) // Ejecutar en caso de conectarse
    .catch(error => console.log(error)) 