const mongoose = require('mongoose')

const dBConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
            });
            console.log('Connected to database')
        
    } catch (error) {
        console.log('error')
        throw new Error('Error a la hora de iniciar la base de datos')
        
    }
}

module.exports={
    dBConnection
}