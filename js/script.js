document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenedor");

  function fetchProductos() {
    fetch("https://dummyjson.com/products?limit=12")
      .then((response) => response.json())
      .then((data) => {
        const productos = data.products;

        container.innerHTML = ""; //limpio contenedor

        productos.forEach((product) => 
          {
          const cardDiv = document.createElement("div");
          cardDiv.className = "col-md-15";
          cardDiv.innerHTML = `
            <div class="producto">
              <img src="${product.thumbnail}" class="img" alt="${product.title}" width="250">
              <div class="detalle">
                <h5 class="titulo_producto">${product.title}</h5>
                <p class="precio_producto">Precio: $${product.price}</p>
                <button class="compra">Comprar</button>
              </div>
            </div>
          `;
          
          const botonAgregar = cardDiv.querySelector("button");
          botonAgregar.addEventListener("click", () => 
            {
            agregarproducto(product.id, product.title, product.price);
          });

          container.appendChild(cardDiv);
        });
      })
      .catch((error) => console.error("Error al cargar la api", error));
  }
  fetchProductos();
  
  actualizarCarrito();

  document.getElementById("ItemsCompra").addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id); // Recupera el ID del producto
    if (e.target.id === "suma") {
      suma(id);
    } else if (e.target.id === "resta") {
      resta(id);
    }
  });

  document.getElementById('limpiar-carrito').addEventListener('click', () => {
    localStorage.removeItem('carrito'); 
    window.location.href = 'index.html'; 
  });
  document.getElementById('finalizar-compra').addEventListener('click', () =>{
    swal({
      title: 'Compra Procesada',
      text: 'Se ha procesado la compra #1200',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    localStorage.removeItem('carrito'); 
    
    setTimeout(() => {
      window.location.href = 'index.html'; 
    }, 3000);     
  });
});

//agrego y vrifico que los productos no esten repetidos. 
function agregarproducto(id, title, price) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var quantity = 1;
  const existe = carrito.find(item => item.id === id); 
  if (!existe) {
    carrito.push({ id, title, price, quantity});
  }    
  localStorage.setItem("carrito", JSON.stringify(carrito));
  swal(`¡Se agrego ${title} al carrito!`);
}

//actualizo el carrito a los cambios que hago
function actualizarCarrito(){
  const carritolocal = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoTableBody = document.getElementById('ItemsCompra');
  const totalgeneral = document.getElementById('sumatotal');
  let total = 0;

  carritolocal.innerHTML = "";
  carritoTableBody.innerHTML = "";

  carritolocal.forEach(item => {
    const row = document.createElement('tr');
    
    //Nombre
    const nombreCelda = document.createElement('td');
    nombreCelda.textContent = item.title;
    row.appendChild(nombreCelda);

    //Precio
    const precioCelda = document.createElement('td');
    precioCelda.textContent = `$${item.price}`;
    row.appendChild(precioCelda);

    //Cantidad
    const producto = document.createElement("div");
    producto.innerHTML = `
        <div class=botoncitos>
            <button id="resta" data-id="${item.id}"> - </button>
            <span>${item.quantity}</span>
            <button id="suma" data-id="${item.id}"> + </button>
        </div>
    `;
    row.appendChild(producto);

    //Costo
    var costo = item.price * item.quantity; 
    const subtotalCelda = document.createElement('td');
    subtotalCelda.textContent = costo.toFixed(2);;
    row.appendChild(subtotalCelda);

    //Boton de borrado
    const borrado = document.createElement("div");
    borrado.innerHTML = `
      <div class=botonborrado >
        <button onclick= "borro(${item.id})" > X </button>
      </div>
    `;
    row.appendChild(borrado);

    carritoTableBody.appendChild(row);

    total += costo;
    
    totalgeneral.textContent = total.toFixed(2);
  });
}

//borro un item particular
function borro(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

//sumo 1 cantidad a producto
function suma (id){
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.map(item => {
    if (item.id === id) {
      item.quantity += 1;
    }
    return item;
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

//resto 1 cantidad a producto
function resta (id){
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.map(item => {
    if ((item.id === id) && (item.quantity > 1)){
        item.quantity -= 1;
    }
    return item;
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
} 