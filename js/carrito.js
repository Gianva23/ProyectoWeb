document.addEventListener("DOMContentLoaded", () => 
    {
    const carritolocal = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoTableBody = document.getElementById('ItemsCompra');
    const totalgeneral = document.getElementById('sumatotal');
    let total = 0;

    carritolocal.forEach(item => 
    {
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
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = 1;
        row.appendChild(cantidadCelda);

        //Costo
        const costo = item.price; 
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${costo}`;
        row.appendChild(subtotalCelda);


        carritoTableBody.appendChild(row);

        total += costo;
    });

    //total
    totalgeneral.textContent = total.toFixed(2);


    document.getElementById('limpiar-carrito').addEventListener('click', () => 
    {
        localStorage.removeItem('carrito'); 
        window.location.href = 'index.html'; 
    });
    document.getElementById('finalizar-compra').addEventListener('click', () => 
    {
        swal({
            title: 'Compra Procesada',
            text: 'Se ha procesado la compra #1200',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        localStorage.removeItem('carrito'); 
        
        setTimeout(() => {
        window.location.href = 'index.html'; 
        }, 4000);     
    });
});