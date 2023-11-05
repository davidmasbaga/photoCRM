const mongoose = require('mongoose');

const dBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Error when starting the database');
    }
}

module.exports = {
    dBConnection
};
