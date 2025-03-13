const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const usersRouter = require('./routes/users');

const app = express();

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173', // Asegúrate de que este sea el dominio correcto de tu frontend
    methods: ['POST', 'OPTIONS'], // Añade OPTIONS para preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Añade los encabezados necesarios
}));

// Manejar solicitudes preflight
app.options('*', cors());

app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});