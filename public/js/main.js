document.getElementById('connectButton').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    try {
        const response = await fetch('http://localhost:5500/api/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            statusDiv.className = 'status success';
            statusDiv.textContent = 'Conexión exitosa con SAP B1';
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        statusDiv.className = 'status error';
        statusDiv.textContent = `Error: ${error.message}`;
    }
});