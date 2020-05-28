const /*fs = require('fs'),
    https = require('https'),*/
    port = 7777;

const express = require('express'),
    app = express();

app.use(express.static('./build'));

/*const sslOptions = {
    key: fs.readFileSync(__dirname + "/ssl/epsgrau.key"),
    cert: fs.readFileSync(__dirname + "/ssl/ssl_certificate.crt"),
    ca: fs.readFileSync(__dirname + "/ssl/IntermediateCA.crt")
};

const server = https.createServer(sslOptions, app);*/

app.listen(port, () => {
    console.log(`Servidor cliente corriendo en http://localhost:${port}`)
});
