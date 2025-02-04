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


//     // === server.js ===
// const express = require('express');
// // const fetch = require('node-fetch');
// const path = require('path');
// const cors = require('cors');
// const config = require('./config/config');
// const app = express();
// const PORT = 5500;
// app.use(cors({
//     origin: 'http://localhost:5500',
//     credentials: true
//   }));
// app.use(express.json());
// app.use(express.static('public'));

// // Ruta para autenticación con SAP B1
// app.post('/api/connect', async (req, res) => {
//     try {
//         // Primero verifica si el servidor responde
//         const testConnection = await new Promise((resolve, reject) => {
//             const net = require('net');
//             const client = new net.Socket();
            
//             client.setTimeout(5000);
            
//             client.on('error', (error) => {
//                 if(error.code === 'ECONNREFUSED') {
//                     reject('El servidor SAP no está respondiendo en el puerto especificado');
//                 } else {
//                     reject(`Error de conexión: ${error.message}`);
//                 }
//             });

//             // Corregimos la forma de usar connect asegurándonos que los argumentos estén definidos
//             const port = parseInt(config.serverPort); // Aseguramos que sea número
//             const host = config.serverIP; // La IP del servidor
            
//             console.log('Intentando conectar con:', {
//                 port: port,
//                 host: host,
//                 portType: typeof port
//             });

//             if (!port || !host) {
//                 reject('Configuración de puerto o IP incorrecta');
//                 return;
//             }

//             client.connect(port, host, () => {
//                 client.end();
//                 resolve(true);
//             });
//         });

//         if(testConnection) {
//             const loginUrl = `https://${config.serverIP}:${config.serverPort}/b1s/v1/Login`;
//             // ... resto del código de conexión

//             res.json({
//                 status: 'success',
//                 message: 'Conexión exitosa'
//             });
//         }
//     } catch (error) {
//         console.error('Error detallado:', error);
//         res.status(500).json({ 
//             success: false, 
//             error: typeof error === 'string' ? error : error.message
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

