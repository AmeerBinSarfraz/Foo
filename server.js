const express = require("express");
// create express appnpm
const app = express();




require('./config/app.config')(app);
require('./src/middleware/passport.middleware');
// Configuring the database
require("./config/database.config");
// import all routes at once
require("./config/routes.config")(app);
require("./src/middleware/error_handler.middleware")(app);


/**
 * 

1. Build the docker file.
2. Create the docker context.
3. Push those files to newly created account on hub.docker.com
4. Test the app locally to see if you can get it served.

FYI - you can use ngrok.com if you don't want to involve hub.docker.com account.

I also assume that you need to be fully aware of the ngrok.
 */