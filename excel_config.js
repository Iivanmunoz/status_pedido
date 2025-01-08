const XLSX = require('xlsx');
const path = require('path');

function leerExcel(ruta) {
    console.log('Intentando leer archivo:', ruta);
    
    const workbook = XLSX.readFile(path.join(__dirname, ruta));
    console.log('Hojas disponibles:', workbook.SheetNames);
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(sheet);
    
    console.log('Datos leídos exitosamente');
    return datos;
}

module.exports = { leerExcel };