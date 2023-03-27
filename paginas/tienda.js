function tienda() {
    fetch(rutaServidor + "categorias.php")
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            llenarListaCategorias(data);
        });

    const llenarListaCategorias = (data) => {
        let contenidoLista = "";
        data.map(item => {
            let itemLista = "<li class='list-group-item' idcategoria='"
                + item.idcategoria + "' title='"
                + item.descripcion + "'>";
            itemLista += item.nombre;
            itemLista += "</li>";
            contenidoLista += itemLista;
        });
        document.getElementById("lista-categorias").innerHTML = contenidoLista

        let itemsCategorias = document.querySelectorAll("#lista-categorias li");
        itemsCategorias.forEach(itemLista => {
            itemLista.addEventListener("click", (event) => seleccionarCategoria(event))
        })

        const seleccionarCategoria = (event) => {
            let nombreCategoria = event.currentTarget.innerHTML
            let idcategoria = event.currentTarget.getAttribute("idcategoria");
            console.log(idcategoria);
            document.getElementById("titulo-categoria").innerHTML = nombreCategoria;

            let itemsCategorias = document.querySelectorAll("#lista-categorias li");
            itemsCategorias.forEach(itemLista => {
                itemLista.classList.remove("active");
            })

            event.currentTarget.classList.add("active");
            //event.currentTarget es el objeto que recibe el evento
            //classList.add("active"); a la lista de clase se añade la clase active
            leerProductos(idcategoria);
        }
    }

    const leerProductos = (idcategoria) => {
        fetch(rutaServidor + "productos.php?idcategoria=" + idcategoria)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                llenarCuadriculaProductos(data)
            });
    }

    const llenarCuadriculaProductos = (data) => {
        let contenidoCuadricula = ""; 
        data.map( (item, index) => {
            //console.log(item.nombre);

            let card = "<div class='col'>";
            card += "<div class='card'>";
            card += "<img src='" + rutaServidor + item.imagenchica + "' class='card-img-top' alt='...'>";
            card += "<div class='card-body'>";
            card += "<h5 class='card-title'>" + item.nombre 
                + " <i class='bi bi-eye-fill btnVistaRapida' idproducto='" + item.idproducto + "'" 
                + " data-bs-toggle='modal' data-bs-target='#vistaRapidaModal'></i></h5>";
            card += "<p class='card-text'>S/ " + parseFloat(item.precio).toFixed(2) 
                    + " <i class='bi bi-basket-fill btnAgregarItemCarrito' " 
                    + " producto-idproducto='" + index + "'"
                    + " producto-nombre='" + item.nombre + "'" 
                    + " producto-precio='" + item.precio + "'></i></p>";
            card += "</div></div></div>"    ;
            contenidoCuadricula += card;
        });
        document.getElementById("cards-productos").innerHTML = contenidoCuadricula;
        let botonesVistaRapida = document.querySelectorAll("#cards-productos .btnVistaRapida");
        //querySelectorAll selecciona todos los objetos con la condición que se indica
        //botonesVistaRapida es un arreglo que contiene a los elementos indicados en querySelectorAll
        botonesVistaRapida.forEach( item => {
            //item representa a cada uno de los elementos que se está examinando
            item.addEventListener("click", (event) => leerProductoSolo(event))
        })
        let botonesAgregarItemCarrito = document.querySelectorAll("#cards-productos .btnAgregarItemCarrito");
        botonesAgregarItemCarrito.forEach( item => {
            item.addEventListener("click", (event) => agregarItemCarrito(event))
        })
    }
    agregarItemCarrito = (event) => {
        let idproducto = event.currentTarget.getAttribute("producto-idproducto");
        let nombre = event.currentTarget.getAttribute("producto-nombre");
        let precio = event.currentTarget.getAttribute("producto-precio");

    }


    leerProductoSolo = (event) => {
        //console.log(event.currentTarget.getAttribute("idproducto"));
        let idproducto = event.currentTarget.getAttribute("idproducto")
        fetch(rutaServidor + "productos.php?idproducto=" + idproducto)
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
                document.getElementById("producto-detalle-nombre").innerText = data[0].nombre;
                document.getElementById("producto-detalle-imagen").src = rutaServidor + data[0].imagengrande
                document.getElementById("producto-detalle-detalle").innerText = data[0].detalle;
                document.getElementById("producto-detalle-precio").innerText = data[0].precio;
                document.getElementById("producto-detalle-stock").innerText = data[0].unidadesenexistencia;
            });
    }

}
tienda();