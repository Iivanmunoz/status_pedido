document.addEventListener('DOMContentLoaded',  () => {

    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const ordersSection = document.getElementById('ordersSection');
    const ordersList = document.getElementById('ordersList');
    const logoutBtn = document.getElementById('logoutBtn');



    // Sample user data (in a real app, this would be in a backend)
    const validUser = {
        email: 'user@example.com',
        password: 'password123'
    };

    // Sample orders data
    const orders = [
        { id: 3, pieces: 100, status: 3 },
        { id: 4, pieces: 100, status: 2 },
        { id: 5, pieces: 100, status: 1 }
    ];

//window.addEventListener('load', cargarDatos());

async function cargarDatos() {
    try {
        const response = await fetch('http://localhost:3000/datos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const datos = await response.json();
        console.log(datos);
        displayOrders(datos);
    } catch (error) {
        console.error('Error:', error);
    }
}


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === validUser.email && password === validUser.password) {
            loginSection.style.display = 'none';
            ordersSection.style.display = 'block';
            cargarDatos();
            
        } else {
            alert('Credenciales inválidas');
        }
    });

    logoutBtn.addEventListener('click', () => {
        loginSection.style.display = 'block';
        ordersSection.style.display = 'none';
        loginForm.reset();
    });

    function displayOrders(orders) {
        ordersList.innerHTML = '';
        orders.forEach(order => {
            const orderCard = createOrderCard(order);
            ordersList.appendChild(orderCard);
        });
    }

    function createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'order-card';
        
        // Crear ID único por pedido
        const collapseId = `collapse-${order.num_pedido}`;
        
        card.innerHTML = `
            <div onclick="toggleCollapse('${collapseId}')">
                <h3>PEDIDO #${order.num_pedido}</h3>
                <p>CANTIDAD DE PIEZAS: ${order.cantidad_piezas}</p>
           
                    <div class="order-status">
                        <div class="status-dot ${order.status_pedido >= 1 ? 'active' : ''}" data-status="1"></div>
                        <div class="status-line"></div>
                        <div class="status-dot ${order.status_pedido >= 2 ? 'active' : ''}" data-status="2"></div>
                        <div class="status-line"></div>
                        <div class="status-dot ${order.status_pedido >= 3 ? 'active' : ''}" data-status="3"></div>
                        <div class="status-line"></div>
                        <div class="status-dot ${order.status_pedido >= 4 ? 'active' : ''}" data-status="4"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.8rem;">
                        <span class="${order.status_pedido >= 1 ? 'active' : ''}">PEDIDO INGRESADO</span>
                        <span class="${order.status_pedido >= 2 ? 'active' : ''}">SURTIENDO</span>
                        <span class="${order.status_pedido >= 3 ? 'active' : ''}">EMPACANDO</span>
                        <span class="${order.status_pedido >= 4 ? 'active' : ''}">PEDIDO LISTO</span>
                    </div>
                    
            </div>
            
            
            <div class="collapse collapse-horizontal" id="${collapseId}">
                <div class="modal-content">
                    <div class="details-grid">
                        <div class="detail-item">
                            <strong>Fecha de pedido:</strong> ${order.fecha_pedido}
                        </div>
                        <div class="detail-item">
                            <strong>Ubicación de pedido:</strong> ${order.ubicación}
                        </div>
                        <div class="detail-item">
                            <strong>Cliente:</strong> ${order.cliente}
                        </div>
                        <div class="detail-item">
                            <strong>Status de tu pedido:</strong> ${order.status_pedido}
                        </div>
                        <button class="invoice-btn" onclick="window.location.href ='https://sistema.ncontrol.mx/PortalCliente/Comprobante40/DE2364C4-1CBB-9243-932F-3F5D394771F4'">Ver Factura</button>
                        <button class="invoice-btn" onclick="window.location.href = 'https://www.paquetexpress.com.mx/rastreo/MEX01WWA194361'">Guia Pedido</button>
                    </div>
                </div>
            </div>
        `;
        
        return card;
     }
     


});

document.addEventListener('DOMContentLoaded', function() {
    let zindex = 10;
    
    // Seleccionar todas las cards
    const cards = document.querySelectorAll('div.orders-container');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            let isShowing = false;
            
            // Verificar si esta carta está mostrada
            if (this.classList.contains('show')) {
                isShowing = true;
            }
            
            const cardsContainer = document.querySelector('div.orders-container');
            
            // Verificar si hay alguna carta mostrada
            if (cardsContainer.classList.contains('showing')) {
                // Una carta ya está en vista
                const cardShowing = document.querySelector('div.orders-list.show');
                if (cardShowing) {
                    cardShowing.classList.remove('show');
                }
                
                if (isShowing) {
                    // Esta carta estaba mostrándose - resetear el grid
                    cardsContainer.classList.remove('showing');
                } else {
                    // Esta carta no se está mostrando - mostrarla
                    this.style.zIndex = zindex;
                    this.classList.add('show');
                }
                
                zindex++;
                
            } else {
                // No hay cartas en vista
                cardsContainer.classList.add('showing');
                this.style.zIndex = zindex;
                this.classList.add('show');
                
                zindex++;
            }
        });
    });
});