const express = require('express');
const routes = require('./routes');  // './' serve para mostrar que é um arquivo, e não um pacote, que nem o express. 
const app = express();
const cors = require('cors');

app.use(cors());  /*
app.use(cors({
    origin: 'http://meuapp....'

}));
*/ 
app.use(express.json());
app.use(routes);


app.listen(3333);
 
