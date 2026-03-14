require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('✅ Conectado exitosamente a la base de datos de AdminBot');
});

app.get('/api/estudiantes', (req, res) => {
    const query = 'SELECT * FROM estudiantes';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Error al obtener estudiantes', 
                details: err.message 
            });
        }
        res.status(200).json(results);
    });
});


app.post('/api/estudiantes', (req, res) => {
    const { 
        id, 
        codigo_estudiante, 
        nombres, 
        apellidos, 
        grado, 
        anio_lectivo 
    } = req.body;

    if (!codigo_estudiante || !nombres || !apellidos) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const query = `
        INSERT INTO estudiantes (id, codigo_estudiante, nombres, apellidos, grado, anio_lectivo) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const studentId = id || uuidv4();

    db.query(query, [studentId, codigo_estudiante, nombres, apellidos, grado, anio_lectivo], (err, result) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Error al registrar el estudiante', 
                details: err.message 
            });
        }
        res.status(201).json({ 
            message: 'Estudiante creado con éxito', 
            id: studentId 
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor AdminBot corriendo en: http://localhost:${PORT}`);
});