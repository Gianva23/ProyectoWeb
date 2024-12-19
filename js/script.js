document.addEventListener("DOMContentLoaded", () => 
    {
    const container = document.getElementById("contenedor");
  
    function fetchProductos() 
    {
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
              agregarproducto(product);
            });

            container.appendChild(cardDiv);
          });
        })
        .catch((error) => console.error("Error al cargar la api", error));
    }

    function agregarproducto(product) 
    {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(product);      
      localStorage.setItem("carrito", JSON.stringify(carrito));
      swal(`¡Se agrego ${product.title} al carrito!`);
    }
    fetchProductos();
  });