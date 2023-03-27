//console.log("proveedores");
function proveedores() {
    fetch(rutaServidor + "proveedores.php")
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            llenarTablaProveedores(data);
        });

    const llenarTablaProveedores = (data) => {
        let contenidoTabla = "";
        data.map(item => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.idproveedor + "</td>";
            fila += "<td>" + item.nombreempresa + "</td>";
            fila += "<td>" + item.nombrecontacto + "</td>";
            fila += "<td>" + item.cargocontacto + "</td>";
            fila += "<td>" + item.ciudad + "</td>";
            fila += "<td>" + item.pais + "</td>";
            fila += "</tr>";
            contenidoTabla += fila;
        });
        document.getElementById("tbody-proveedores").innerHTML = contenidoTabla
    }
}
proveedores();