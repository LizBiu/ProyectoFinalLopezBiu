const boletos = {
  vip: {
    nombre: 'VIP',
    precio: 100,
    disponibles: 5
  },
  platino: {
    nombre: 'Platino',
    precio: 80,
    disponibles: 5
  },
  golden: {
    nombre: 'Golden',
    precio: 60,
    disponibles: 5
  },
  discapacitado: {
    nombre: 'Discapacitado',
    precio: 40,
    disponibles: 5
  }
};

const carrito = {
  vip: 0,
  platino: 0,
  golden: 0,
  discapacitado: 0
};

function actualizarCarrito(tipo) {
  const cantidad = parseInt(document.getElementById(tipo).value, 10);
  const disponibles = boletos[tipo].disponibles;

  if (cantidad > disponibles) {
    alert(`No hay suficientes boletos ${boletos[tipo].nombre} disponibles.`);
    document.getElementById(tipo).value = disponibles;
  }

  carrito[tipo] = cantidad;
  mostrarResumen();
}

function mostrarResumen() {
  const carritoBody = document.getElementById('carrito-body');
  const descuentoElement = document.getElementById('descuento');
  const totalElement = document.getElementById('total');

  carritoBody.innerHTML = '';

  let subtotal = 0;

  for (const tipo in carrito) {
    if (carrito[tipo] > 0) {
      const cantidad = carrito[tipo];
      const precioUnitario = boletos[tipo].precio;
      const subtotalTipo = cantidad * precioUnitario;

      subtotal += subtotalTipo;

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${boletos[tipo].nombre}</td>
          <td>${cantidad}</td>
          <td>$${precioUnitario.toFixed(2)}</td>
          <td>$${subtotalTipo.toFixed(2)}</td>
        `;
      carritoBody.appendChild(row);
    }
  }

  let descuento = 0;
  let total = subtotal;

  if (carrito.vip + carrito.platino + carrito.golden + carrito.discapacitado >= 4) {
    const boletosNormales = carrito.vip + carrito.platino + carrito.golden + carrito.discapacitado;
    const boletosGratis = Math.floor(boletosNormales / 4);
    descuento = boletosGratis * boletos.vip.precio * 0.2;
    total -= descuento;
  }

  descuentoElement.textContent = `-$${descuento.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

function comprar() {
  // Aquí podrías implementar la lógica para procesar la compra, mostrar un mensaje de agradecimiento, etc.
  alert('¡Gracias por tu compra!');
  window.location.href = 'thankyou.html';
}

function registrarInteres() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;

  console.log('Nombre:', nombre);
  console.log('Email:', email);

  fetch('clientesInteres.json')
    .then(response => response.json())
    .then(clientesInteres => {
      clientesInteres.push({
        nombre,
        email
      });
      return fetch('clientesInteres.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientesInteres)
      });
    })
    .then(() => {
      console.log('Registro exitoso');
      mostrarClientesInteres();
    })
    .catch(error => console.error('Error:', error));
}



function mostrarClientesInteres() {
  const interesList = document.getElementById('interes-list');

  if (!interesList) {
    console.error('Elemento con ID "interes-list" no encontrado en el DOM.');
    return;
  }

  fetch('clientesInteres.json')
    .then(response => {
      return response.json();
    })
    .then(clientesInteres => {
      interesList.innerHTML = '';

      clientesInteres.forEach(cliente => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${cliente.nombre}, Email: ${cliente.email}`;
        interesList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', function () {
  mostrarClientesInteres();
});


function limpiarInteres() {
  fetch('clientesInteres.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '[]'
    })
    .then(() => {
      mostrarClientesInteres();
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('limpiar-lista-btn').addEventListener('click', limpiarInteres);
  limpiarInteres();
});

const btn = document.getElementById('limpiar-lista-btn');

document.addEventListener('DOMContentLoaded', function () {
  $('body').css('background-color', 'lightgray');
});
