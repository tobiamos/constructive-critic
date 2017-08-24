const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbURI = "mongodb://127.0.0.1/critic";
mongoose.connect(dbURI);

mongoose.connection.on('connected',()=>{
    console.log('Connected to', dbURI);

});

mongoose.connection.on('error', (err)=>{
    console.error(`Error connecting to ${dbURI}`, err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('disconnected from ', dbURI);
});