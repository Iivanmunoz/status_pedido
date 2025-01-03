document.addEventListener('DOMContentLoaded',  () => {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const ordersSection = document.getElementById('ordersSection');
    const ordersList = document.getElementById('ordersList');
    const logoutBtn = document.getElementById('logoutBtn');

    // const facturas = [

    //     {id: 3, link:"https://sistema.ncontrol.mx/PortalCliente/Comprobante40/7F4471EF-48D9-6C4E-AEEB-7F011104FB7B"},
    //     {id: 4, link:"https://sistema.ncontrol.mx/PortalCliente/Comprobante40/DE2364C4-1CBB-9243-932F-3F5D394771F4"}

    // ]

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

    // function asignarLinksFacturas() {
    //     const botonesFactura = document.querySelectorAll('.invoice-btn');
        
    //     botonesFactura.forEach((boton, index) => {
    //         if (facturas[index]) {
    //             boton.addEventListener('click', () => {
    //                 window.open(facturas[index].link, '_blank');
    //             });
    //         }
    //     });
        
    // }
    // document.addEventListener('DOMContentLoaded', asignarLinksFacturas);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === validUser.email && password === validUser.password) {
            loginSection.style.display = 'none';
            ordersSection.style.display = 'block';
            displayOrders();
        } else {
            alert('Credenciales inválidas');
        }
    });

    logoutBtn.addEventListener('click', () => {
        loginSection.style.display = 'block';
        ordersSection.style.display = 'none';
        loginForm.reset();
    });

    function displayOrders() {
        ordersList.innerHTML = '';
        orders.forEach(order => {
            const orderCard = createOrderCard(order);
            ordersList.appendChild(orderCard);
        });
    }

    function createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'order-card';
        
        card.innerHTML = `
            <h3>PEDIDO ${order.id}</h3>
            <p>CANTIDAD DE PIEZAS: ${order.pieces}</p>
            <div class="order-status">
                <div class="status-dot ${order.status >= 1 ? 'active' : ''}"></div>
                <div class="status-line"></div>
                <div class="status-dot ${order.status >= 2 ? 'active' : ''}"></div>
                <div class="status-line"></div>
                <div class="status-dot ${order.status >= 3 ? 'active' : ''}"></div>
                <div class="status-line"></div>
                <div class="status-dot ${order.status >= 4 ? 'active' : ''}"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.8rem;">
                <span>PEDIDO INGRESADO</span>
                <span>SURTIENDO</span>
                <span>EMPACANDO</span>
                <span>PEDIDO LISTO</span>
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