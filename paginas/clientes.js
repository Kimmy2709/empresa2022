//console.log("proveedores");
fetch(rutaServidor + "clientes.php")
    .then((response) => response.json())
    .then((data)=>{
        //console.log(data);
        llenarTablaClientes(data);
    });

    function llenarTablaClientes(data){
        let contenidoTabla = ""; 
        data.map( item => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.idcliente + "</td>";
            fila += "<td>" + item.nombres + "</td>";
            fila += "<td>" + item.telefono + "</td>";
            fila += "<td>" + item.direccion + "</td>";
            fila += "<td>" + item.ciudad + "</td>";
            fila += "</tr>";
            contenidoTabla += fila;
        });
        document.getElementById("tbody-clientes").innerHTML = contenidoTabla
    }