let products = [];
let CarritoDeCompras = [];

// con target.value hago que directamente la consola muestra solo el ID del producto selecionado
const addToCart = (event, id) => {
    const cantidades = event.target.previousElementSibling.value;
    const productoEnCarrito = isInCart(id);

    if(productoEnCarrito){
        const indexDelProducto = CarritoDeCompras.findIndex(producto => producto.id === productoEnCarrito.id);
        const product = CarritoDeCompras[indexDelProducto]
        if((product.cantidad < productoEnCarrito.stock) && (parseInt(product.cantidad) + parseInt(cantidades) < productoEnCarrito.stock )) {
            product.cantidad = parseInt(product.cantidad) + parseInt(cantidades);
        } else {
            alert("No hay más stock");
            product.cantidad = productoEnCarrito.stock;
        }
        renderProductsInCart(CarritoDeCompras,'.cartshop');
        return;
    }
    // Llamo a la Base de datos del producto con el método find según el id del producto seleccionado
    const productoDataBase = products.find(producto => producto.id === id);
    productoDataBase.cantidad = cantidades;  
    // Con la consola veo que funcione 
    // console.log(productoDataBase)
    CarritoDeCompras.push(productoDataBase);
    localStorage.setItem("carrito",JSON.stringify(CarritoDeCompras));
    renderProductsInCart(CarritoDeCompras, ".cartshop");
}

// genero el catálogo del array de productos en el html
const renderProducts = (arrayProductos, elemento) => {
    const productDiv = document.querySelector(elemento);

    productDiv.innerHTML = "";
    let html = "";
    
    arrayProductos.forEach(element => {
        //Articulos de los productos con su datos correspondientes y su botón de comprar
        html += `
            <article>
                <p>${element.nombre}</p>
                <img id="imgscale" src=${element.img}>
                <span>${element.precio}$</span>
                <input class="input-qty input-qty-${element.id}" type="number" value="1">
                <button class="btn-comprar" onclick="addToCart(event,'${element.id}')">Comprar</button>
            </article>
        `;
    })
    productDiv.innerHTML = html;
}

// Eliminar productos del carrito
const deleteItem = (idProducto) => {
    const deleteP = CarritoDeCompras.filter(element => element.id !== idProducto);
    CarritoDeCompras = deleteP;

    localStorage.setItem("carrito",JSON.stringify(CarritoDeCompras));
    renderProductsInCart(deleteP, ".cartshop");

   // console.log(CarritoDeCompras);

    if(CarritoDeCompras.length === 0){
        document.querySelector(".cartshop").innerHTML = '<h3>X</h3>'
    }
}

// Renderizar productos en la sección del carrito
const renderProductsInCart = (arrayProductos, elemento) => {
    const cartDiv = document.querySelector(elemento);
    cartDiv.innerHTML = "";
    let html = "";
    
    arrayProductos.forEach(element => {
        //Articulos de los productos con su datos correspondientes y su botón de comprar
        html += `
            <article id="ajustecompras">
                <p id="p-chico">${element.nombre}</p>
                <img id="imgscale" src=${element.img}>
                <span>${element.precio}$</span>
                <p>Cantidad: ${element.cantidad}</p>
                <button class="btn-eliminar" onclick="deleteItem('${element.id}')">X</button>
            </article>
        `;
    })
    cartDiv.innerHTML = html;
}

const isInCart = (productid) => CarritoDeCompras.find(producto => producto.id === productid);

window.onload = () => {
    if(CarritoDeCompras.length === 0){
        document.querySelector(".cartshop").innerHTML = '<h3>X</h3>'
    }
    $.get("../db/products.json", function( data ) {
        products = [...data['0']];
        // console.log('Products despues de ejecutar el codigo: ', products);
        renderProducts(products, '.products'); 
    });
}