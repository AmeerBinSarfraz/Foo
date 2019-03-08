const passport = require('passport');
const helmet = require('helmet');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const winston = require("../src/middleware/winston.middleware");


module.exports = (app) => {
    app.use(cors());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    app.use(morgan('dev'));
    // setup the winston stream
    app.use(morgan("combined", { stream: winston.stream }));

    // using default helmet, for more detail goto: https://helmetjs.github.io/
    app.use(helmet());

    app.use(passport.initialize());
    app.use(passport.session());




    // server listen for requests
    var port = process.env.PORT || 3000;
    app.listen(port, "0.0.0.0", () => {
        console.log("Server is listening on port " + port);
    });

    // define a default route
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to MVP" });
    });
}