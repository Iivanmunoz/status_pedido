const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

app.get('/datos/', (req, res) => {
    try {
        // Validar que el archivo existe
        if (!fs.existsSync('datos/base_status.xlsx')) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        const workbook = XLSX.readFile('datos/base_status.xlsx');
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const datos = XLSX.utils.sheet_to_json(sheet); 

        // Configurar headers correctamente
        res.setHeader('Content-Type', 'application/json');
        res.json(datos);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
    app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
