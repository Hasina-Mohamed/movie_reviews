const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true,
        useUnifiedTopology : true}).then(() => console.log('Database Connected successfuly', mongoose.connection.host, mongoose.connection.name)).catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;