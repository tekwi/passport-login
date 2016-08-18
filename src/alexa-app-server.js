var AlexaAppServer = require('alexa-app-server');
AlexaAppServer.start({
    server_root:__dirname,     // Path to root
    public_html:"public", // Static content
    app_dir:"apps",            // Where alexa-app modules are stored
    app_root:"/alexa/",        // Service root
    port:8082                  // What port to use, duh
});



