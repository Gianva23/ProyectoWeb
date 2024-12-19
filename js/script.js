document.addEventListener("DOMContentLoaded", () => 
    {
    const container = document.getElementById("contenedor");
  
    function fetchProductos() 
    {
      fetch("https://dummyjson.com/products?limit=15")
        .then((response) => response.json())
        .then((data) => {
          const productos = data.products;
  
          container.innerHTML = ""; //limpio contenedor
  
          productos.forEach((product) => 
            {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-15"; // es una clase de bootstrap modificar 5-20
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
            // Agregar evento al botón "Agregar"
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => 
              {
              agregarAlCartito(product);
            });
  
            // Añadir la card al contenedor
            container.appendChild(cardDiv);
          });
        })
        .catch((error) => console.error("Error", error));
    }
  
    // Función para agregar al carrito usando localStorage
    function agregarAlCartito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      //agregar otro producto o el primero
      cart.push(product);      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    }
  
    // Carga inicial de productos
    fetchProductos();
  });