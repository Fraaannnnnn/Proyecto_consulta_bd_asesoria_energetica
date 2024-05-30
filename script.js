let allData = [];

// Función para filtrar datos
function filterData(data, filters) {
    return data.filter(item => {
        return (!filters.cif || item.CIF.toLowerCase().includes(filters.cif.toLowerCase())) &&
               (!filters.nombre || item.NOMBRE.toLowerCase().includes(filters.nombre.toLowerCase())) &&
               (!filters.comercializadora || item.COMERCIALIZADORA.toLowerCase().includes(filters.comercializadora.toLowerCase())) &&
               (!filters.estado || item.ESTADO.toLowerCase().includes(filters.estado.toLowerCase()));
    });
}

// Función para renderizar datos en la tabla
function renderTable(data) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = ''; // Limpiar resultados anteriores

    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="12">No se encontraron resultados</td>';
        tableBody.appendChild(row);
    } else {
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.CIF}</td>
                <td>${item.NOMBRE}</td>
                <td>${item.CUPS}</td>
                <td>${item.TARIFA}</td>
                <td>${item.COMERCIALIZADORA}</td>
                <td>${item.COMERCIAL}</td>
                <td>${item.ESTADO}</td>
                <td>${item.ACCIONES}</td>
                <td>${item.FECHA}</td>
                <td>${item.PAGADO}</td>
                <td>${item['O 50%']}</td>
                <td>${item['DOCUMENTOS ADJUNTOS']}</td>
                <td>${item['FECHA DE ACABAR CONTRATO']}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Evento para manejar el envío del formulario
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cif = document.getElementById('cif').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const comercializadora = document.getElementById('comercializadora').value.trim();
    const estado = document.getElementById('estado').value.trim();

    const filters = { cif, nombre, comercializadora, estado };
    const filteredData = filterData(allData, filters);
    renderTable(filteredData);
});

// Obtener todos los datos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const url = `http://192.168.101.4:3000/asesoria_energetica`;
    console.log('Fetching data from:', url); // Para depuración

    fetch(url)
        .then(response => {
            console.log('Response received:', response); // Para depuración
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Para depuración
            allData = data;
            renderTable(allData); // Mostrar todos los datos inicialmente
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const tableBody = document.querySelector('#resultsTable tbody');
            tableBody.innerHTML = '<tr><td colspan="12">Error al obtener datos</td></tr>';
        });
});
