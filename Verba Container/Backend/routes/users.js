const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Importamos la conexión a MySQL

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error obteniendo usuarios:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        res.json(results);  // Enviamos los usuarios como respuesta
    });
});

// Ruta para registrar un usuario
router.post('/register', (req, res) => {
    const { uid, name, email, profile_pic, account_type, google_id } = req.body;

    // Validar que los campos importantes estén presentes
    if (!uid || !email || !account_type) {
        return res.status(400).json({ error: 'UID, email y tipo de cuenta son obligatorios' });
    }

    // Si el account_type es google, necesitamos un google_id
    if (account_type === 'google' && !google_id) {
        return res.status(400).json({ error: 'El google_id es obligatorio para cuentas de Google' });
    }

    // Asignar is_google_linked en función del account_type
    const isGoogleLinked = account_type === 'google' ? 1 : 0;

    // Query de inserción
    const sql = 'INSERT INTO users (uid, name, email, profile_pic, is_google_linked, account_type, google_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [uid, name, email, profile_pic, isGoogleLinked, account_type, google_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);  // Mostramos el error en consola
            return res.status(500).json({ error: err.message });  // Mandamos el error exacto al cliente
        }
        res.json({ message: 'Usuario registrado correctamente', id: result.insertId });
    });
});

module.exports = router;
