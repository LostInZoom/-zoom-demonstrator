import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import * as fs from 'fs';

const app = express();
const port = 8001;


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


const jsonParser = bodyParser.json();

app.use('/', express.static('dist'));




// app.get('/zoomdemo/villes', (req, res) => {
//     const pathjson = path.resolve('./assets/villes.json'); 
    
//     fs.readFile(pathjson, 'utf-8', (err, data) => {
//         if (err) {
//             console.error("Erreur de lecture du fichier JSON :", err);
//             return res.status(500).json({ error: "Impossible de charger les villes" });
//         }
//         res.json(JSON.parse(data));
//     });
// });


let server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

server.keepAliveTimeout = 30000;