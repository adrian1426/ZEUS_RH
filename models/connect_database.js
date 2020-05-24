//para conectarme a la BD
//cadena de conexión a mongo db
const mongoose=require('mongoose');
const URI='mongodb://adrian:Adrian.1426@cluster0-shard-00-00-w45pz.mongodb.net:27017,cluster0-shard-00-01-w45pz.mongodb.net:27017,cluster0-shard-00-02-w45pz.mongodb.net:27017/Zeus?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(URI)
  .then(db=>console.log("DB conectado felicidades!!"))
  .catch(err=>console.error("error de conexión",err));


module.exports=mongoose;