// Array inicial de productos disponibles
const productesDisponibles = [
    { id: 1, nom: 'Martillo', preu: 15.99, stock: 10 },
    { id: 2, nom: 'Destornillador', preu: 8.50, stock: 20 },
    { id: 3, nom: 'Taladro', preu: 89.99, stock: 5 },
    { id: 4, nom: 'Sierra', preu: 34.75, stock: 8 },
    { id: 5, nom: 'Cinta métrica', preu: 12.30, stock: 15 },
    { id: 6, nom: 'Nivel', preu: 22.00, stock: 6 }
];

// Estado del carrito
let carrito = [];
let productosCopia = JSON.parse(JSON.stringify(productesDisponibles)); // Copia para mantener stock original

// FUNCIONES DE INICIALIZACIÓN

// Inicializa la aplicación al cargar la página
function inicializar() {
    cargarCarritoDelLocalStorage();
    renderizarCatalogo();
    renderizarCarrito();
    actualizarTotal();
}


// FUNCIONES DE PERSISTENCIA

// Guarda el carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
    const datos = {
        carrito: carrito,
        productosCopia: productosCopia
    };
    localStorage.setItem('carritoHardwareStore', JSON.stringify(datos));
}

// Carga el carrito desde LocalStorage
function cargarCarritoDelLocalStorage() {
    const datosGuardados = localStorage.getItem('carritoHardwareStore');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        carrito = datos.carrito || [];
        productosCopia = datos.productosCopia || JSON.parse(JSON.stringify(productesDisponibles));
    }
}

// FUNCIONES DEL CATÁLOGO

// Renderiza dinámicamente el catálogo de productos
function renderizarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    productosCopia.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        
        const stockInfo = producto.stock > 0 
            ? `<p>Stock: <span class="${producto.stock <= 3 ? 'stock-bajo' : ''}">${producto.stock}</span></p>`
            : '<p class="stock-bajo">AGOTADO</p>';
        
        card.innerHTML = `
            <h3>${producto.nom}</h3>
            <p class="precio"><strong>${producto.preu.toFixed(2)}€</strong></p>
            ${stockInfo}
            <button 
                id="btn-producto-${producto.id}" 
                class="btn-agregar" 
                onclick="agregarAlCarrito(${producto.id})"
                ${producto.stock === 0 ? 'disabled' : ''}>
                ${producto.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
            </button>
        `;
        
        contenedor.appendChild(card);
    });
}

// FUNCIONES DEL CARRITO


// Añade un producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productosCopia.find(p => p.id === productoId);
    
    if (!producto || producto.stock === 0) {
        alert('No hay stock disponible para este producto.');
        return;
    }

    // Buscar si ya existe en el carrito
    const itemCarrito = carrito.find(item => item.id === productoId);

    if (itemCarrito) {
        // Si existe, incrementar cantidad
        itemCarrito.cantidad++;
    } else {
        // Si no existe, añadir como nuevo
        carrito.push({
            id: productoId,
            nom: producto.nom,
            preu: producto.preu,
            cantidad: 1
        });
    }

    // Decrementar stock del catálogo
    producto.stock--;

    // Actualizar interfaz
    guardarCarritoEnLocalStorage();
    renderizarCatalogo();
    renderizarCarrito();
    actualizarTotal();
}

// Elimina un producto del carrito (reduce cantidad en 1)
function eliminarDelCarrito(productoId) {
    const itemCarrito = carrito.find(item => item.id === productoId);
    
    if (!itemCarrito) return;

    // Decrementar cantidad
    itemCarrito.cantidad--;

    // Si la cantidad llega a 0, eliminar del carrito
    if (itemCarrito.cantidad === 0) {
        carrito = carrito.filter(item => item.id !== productoId);
    }

    // Incrementar stock del catálogo
    const producto = productosCopia.find(p => p.id === productoId);
    if (producto) {
        producto.stock++;
    }

    // Actualizar interfaz
    guardarCarritoEnLocalStorage();
    renderizarCatalogo();
    renderizarCarrito();
    actualizarTotal();
}

// Renderiza el carrito dinámicamente
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li style="text-align: center; color: #999;">El carrito está vacío</li>';
        return;
    }

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-carrito';
        li.innerHTML = `
            <div>
                <strong>${item.nom}</strong><br>
                <small>${item.preu.toFixed(2)}€ × ${item.cantidad}</small>
            </div>
            <div>
                <strong>${(item.preu * item.cantidad).toFixed(2)}€</strong>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });
}

// Calcula y actualiza el total del carrito
function actualizarTotal() {
    const total = carrito.reduce((suma, item) => suma + (item.preu * item.cantidad), 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Vacía completamente el carrito y restaura el stock original
function vaciarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
    }

    const confirmar = confirm('¿Estás seguro de que quieres vaciar el carrito?');
    if (!confirmar) return;

    // Restaurar stock original
    productosCopia = JSON.parse(JSON.stringify(productesDisponibles));
    carrito = [];

    // Actualizar interfaz y guardar
    guardarCarritoEnLocalStorage();
    renderizarCatalogo();
    renderizarCarrito();
    actualizarTotal();
}

// Finaliza la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Añade productos antes de finalizar la compra.');
        return;
    }

    const total = carrito.reduce((suma, item) => suma + (item.preu * item.cantidad), 0);
    const mensaje = `¡Compra realizada!\n\nTotal: ${total.toFixed(2)}€\n\nGracias por tu compra.`;
    
    alert(mensaje);

    // Vaciar carrito después de confirmar la compra
    carrito = [];
    productosCopia = JSON.parse(JSON.stringify(productesDisponibles));
    guardarCarritoEnLocalStorage();
    renderizarCatalogo();
    renderizarCarrito();
    actualizarTotal();
}

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', () => {
    inicializar();

    // Botones de control del carrito
    document.getElementById('btn-vaciar').addEventListener('click', vaciarCarrito);
    document.getElementById('btn-comprar').addEventListener('click', finalizarCompra);
});
