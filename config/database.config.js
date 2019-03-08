const mongoose = require("mongoose");
// const dbUrl = 'mongodb://mongo:27017/mvp'
// const dbUrl = 'mongodb://localhost/mvp';
const dbUrl = 'mongodb://0.tcp.ngrok.io:12888/mvp'
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);

// Connecting to the database
mongoose
    .connect(
        dbUrl,
        {
            useNewUrlParser: true
        }
    )
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(err => {
        console.log("Could not connect to the database. Exiting now...");
        process.exit();
    });

