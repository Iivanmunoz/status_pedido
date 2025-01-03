const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));
// o más específico:
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Server running'));