//console.log("proveedores");
fetch(rutaServidor + "empleados.php")
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        llenarTablaEmpleados(data);
    });

    function llenarTablaEmpleados(data){
        let contenidoCuadricula = ""; 
        data.map( item => {
            //console.log(item.nombre);

            
            let card = "<div class='col'>";
            card += "<div class='card'>";
            card += "<img src='http://localhost/servicio1042/fotos/" + item.foto + "' class='card-img-top' alt='...'>";
            card += "<div class='card-body'>";
            card += "<h5 class='card-title'>" + item.nombres + " " + item.apellidos + "</h5>";
            card += "<p class='card-text'>" + item.cargo + "</p>";
            card += "</div></div></div>";

            contenidoCuadricula += card;
        });
        document.getElementById("cards-empleados").innerHTML = contenidoCuadricula;
    }