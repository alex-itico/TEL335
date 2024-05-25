const express = require ('express')
const app = express()
const routes = require('./routes/index.js')
const path = require ('path')
const cors = require('cors')
require('./db.js')
//require('./libs/setup.js')

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(routes)
app.use(cors())

app.listen(3000, ()=>{
    console.log('Corriendo Aplicación para la base del proyecto.')
})