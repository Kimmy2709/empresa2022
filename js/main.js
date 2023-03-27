let rutaServidor = "http://localhost/servicio1042/";
$(function(){
    let fondoClaro = true;
    let mainContent = document.getElementById("main-content");

    $("#btnBlancoNegro").click(function(){
        if(fondoClaro === true){  // if(fondoClaro){
            $("#noticias").css("background-color","#333333")
                        .css("color","#FFFFFF");
            fondoClaro = false;
        }
        else{
            $("#noticias").css("background-color","#FFFFFF")
                        .css("color","#333333");
            fondoClaro = true;
        }
    });

    $("#valores article").click(function(){
        //console.log($(this).css("background-color"))
        if($(this).css("background-color") === "rgba(0, 0, 0, 0)"){
            $(this).css("background-color","rgba(255,255,255,0.3)")
        }
        else{
            $(this).css("background-color","rgba(0, 0, 0, 0)")
        }        
        
        // $(this)  hace referencia al objeto que recibe el evento;
        
    })

    $("#valores h2 span").click(function(){
        $("#valores article").css("background-color","rgba(0, 0, 0, 0)")
    });

    $("section").each(function(){
        let titulo = $(this).find("h2").html();
        //console.log(titulo);
        let idSeccion = $(this).attr("id");

        $("#menu-main").append('<li class="nav-item">' + 
            '<a class="nav-link" href="#' + idSeccion + '">' + titulo + '</a>' +
            '</li>');
    });

    $("#galeria figure").append("<figcaption>");
    $("#galeria figure figcaption").append("<div>");


    //fadeIn, show 
    $("#galeria figure").mouseenter(function(){
        $(this).find("figcaption").stop().slideDown("slow");
    })

    //fadeOut, hide 
    $("#galeria figure").mouseleave(function(){
        $(this).find("figcaption").stop().slideUp("slow");
    })

    $("#galeria figure").each(function(){
        let titulo = $(this).find("img").attr("title");
        let ruta = $(this).find("img").attr("src");
        //console.log(titulo);
        $(this).find("figcaption").find("div").html(titulo);
        $(this).find("figcaption").find("div").append("<i class='bi bi-zoom-in' rutafoto='" + ruta + "'></i>");
    })

    $("#galeria figure figcaption div i").click(function(){
        let rutafoto = $(this).attr("rutafoto"); 
        $("body").append("<div id='fondo-oscuro'>")
        $("#fondo-oscuro").append("<img src='" + rutafoto + "' alt=''>");
        $("#fondo-oscuro").click(function(){
            $(this).remove();
        })
    })

    seleccionarPais($("#lista-paises li:first-child"))

    $("#lista-paises li").click(function(){
        seleccionarPais(this)
    })

    function seleccionarPais(paisSeleccionado){
        $("#lista-paises li").removeClass("active");
        $(paisSeleccionado).addClass("active");
        let nombreArchivo = $(paisSeleccionado).attr("archivo"); 
        fetch("paises/" + nombreArchivo)
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#contenedor-paises").html(data);
        });
    };

    $("#menu-item-inversiones").click(function(){
        fetch("paginas/inversiones.html")
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#main-content").html(data);
            
        });
    })

    $("#menu-item-proveedores").click(function(){
        fetch("paginas/proveedores.html")
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#main-content").html(data);
        });
    })

    document.getElementById("menu-item-clientes").addEventListener("click", () => mostrarClientes());
    const mostrarClientes = () => {
        fetch("paginas/clientes.html")
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#main-content").html(data);
        });
    }

    document.getElementById("menu-item-empleados").addEventListener("click", () => mostrarEmpleados());
    const mostrarEmpleados = () => {
        fetch("paginas/empleados.html")
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#main-content").html(data);
        });
    }

    document.getElementById("menu-item-tienda").addEventListener("click", () => mostrarTienda());
    const mostrarTienda = () => {
        fetch("paginas/tienda.html")
        .then((response) => response.text())
        .then((data)=>{
            //console.log(data);
            $("#main-content").html(data);
        });
    }    
    

    /* LEER SERVICIO WEB *******************/
    fetch(rutaServidor + "empresasenvios.php")
    .then((response) => response.json())
    .then((data)=>{
        //console.log(data);
        llenarTablaEnvios(data);
    });

    function llenarTablaEnvios(data){
        let contenidoTabla = ""; 
        data.map( item => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.idempresaenvio + "</td>";
            fila += "<td>" + item.nombre + "</td>";
            fila += "<td>" + item.telefono + "</td>";
            fila += "</tr>";
            contenidoTabla += fila;
        });
        $("#tbody-envios").html(contenidoTabla);
    }
})


