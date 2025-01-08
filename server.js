const express = require('express');
const app = express();
//const cors = require('cors');
const path = require('path');
const XLSX = require('xlsx');
const { leerExcel } = require('./excel_config');

app.use(express.static(__dirname));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));
app.use(express.static('public'));
app.use(express.json());
// Ruta para obtener datos de Excel
app.get('/datos', (res, req) => { 
    console.log('Ruta /datos accedida');
    try {
        const datos = leerExcel('/datos/base_status.xlsx');
        console.log('Estructura del archivo Excel:', {
            numeroFilas: datos.length,
            primeraFila: datos[0],
            ultimaFila: datos[datos.length - 1]
        });
        
        if (!datos || !Array.isArray(datos)) {
            throw new Error('El formato de datos no es válido');
        }
        
        res.json(datos);
    } catch (error) {
        console.error('Error detallado:', error.message);
        res.status(500).json({ 
            error: 'Error al leer Excel',
            detalles: error.message 
        });
    }
});
app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));