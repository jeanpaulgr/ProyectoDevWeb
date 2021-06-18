// CARGAR ARTICULOS
    
window.onload = function() {
    let valores=getGET();
    let tipo = "";
    if(valores)
    {
        tipo = valores['tipo'];
        console.log("tipo:", tipo)
    }
    
    if(tipo == 2){
        getPlanes()
    }else{
        
        if(tipo == 3){
            getCotizaciones()
        }else{
            if(tipo == 4){
            getNoticias()    
            }else{
            getArticulos()    
            } 
        }
    }

    if(tipo != 4){
        let asideId = document.getElementById("asideId")
        asideId.innerHTML = ""
        asideId.innerHTML += "<h3>Ventajas</h3>"
        asideId.innerHTML += "<p>Mantén las fichas de tus pacientes en un solo lugar, de forma segura y ordenada.</p>"
        asideId.innerHTML += "<p>No pierdas tu tiempo con soluciones complejas. Empieza a usar Historia Clínica en solo minutos</p>"
        asideId.innerHTML += "<p>Porque no todos tienen las mismas necesidades, tenemos una ficha médica distinta para cada especialidad</p>"
        asideId.innerHTML += "<p>Adjunta documentos y exámenes de tus pacientes para llevar su seguimiento</p>"
    }
    
    
       
    
  };

  function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getGET()
{
    // capturamos la url
    let loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0)
    {
        // cogemos la parte de la url que hay despues del interrogante
        let getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        let GET = getString.split('&');
        let get = {};
        // recorremos todo el array de valores
        for(var i = 0, l = GET.length; i < l; i++){
            let tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

let getPlanes = () =>{
console.log("getPlanes");
readTextFile("../Assets/Data/planes.json", function(text){
    let data = JSON.parse(text);
    let planes = data.planes
    let seccionArticulos = document.getElementById("seccionArticulos")
    let cuerpo = "";
    
    planes.map(x => {
        cuerpo += "<article>"
        cuerpo += "<h2>"+ x.titulo+"</h2>"
        cuerpo += "<p>"+ x.subtitulo+"</p>"
        cuerpo += "<img src='"+x.imagen +"'>"
        cuerpo += "</article>"

    });
    seccionArticulos.innerHTML = cuerpo
    let asideId = document.getElementById("asideId")
    asideId.innerHTML = ""
    asideId.innerHTML += "<h3>Ventajas</h3>"
    asideId.innerHTML += "<p>Mantén las fichas de tus pacientes en un solo lugar, de forma segura y ordenada.</p>"
    asideId.innerHTML += "<p>No pierdas tu tiempo con soluciones complejas. Empieza a usar Historia Clínica en solo minutos</p>"
    asideId.innerHTML += "<p>Porque no todos tienen las mismas necesidades, tenemos una ficha médica distinta para cada especialidad</p>"
    asideId.innerHTML += "<p>Adjunta documentos y exámenes de tus pacientes para llevar su seguimiento</p>"

});
}

let getArticulos= () =>{
console.log("getArticulos");
readTextFile("../Assets/Data/articulos.json", function(text){
    let data = JSON.parse(text);
    let articulos = data.articulos
    let seccionArticulos = document.getElementById("seccionArticulos")
    let cuerpo = "";
    
    articulos.map(x => {
        cuerpo += "<article>"
        cuerpo += "<h2>"+ x.titulo+"</h2>"
        cuerpo += "<p>"+ x.subtitulo+"</p>"
        cuerpo += "<img src='"+x.imagen +"'>"
        cuerpo += "</article>"

    });
    seccionArticulos.innerHTML = cuerpo

    let asideId = document.getElementById("asideId")
    asideId.innerHTML = ""
    asideId.innerHTML += "<h3>Ventajas</h3>"
    asideId.innerHTML += "<p>Mantén las fichas de tus pacientes en un solo lugar, de forma segura y ordenada.</p>"
    asideId.innerHTML += "<p>No pierdas tu tiempo con soluciones complejas. Empieza a usar Historia Clínica en solo minutos</p>"
    asideId.innerHTML += "<p>Porque no todos tienen las mismas necesidades, tenemos una ficha médica distinta para cada especialidad</p>"
    asideId.innerHTML += "<p>Adjunta documentos y exámenes de tus pacientes para llevar su seguimiento</p>"

});
}

let getCotizaciones= () =>{
        let dataStorage = localStorage["cotizaciones"]
        let cuerpo = "";
        console.log("getCotizaciones", dataStorage);
        if(dataStorage){
            let data = JSON.parse(dataStorage);
            let cotizacionesId = document.getElementById("cotizacionesId")
          
            data.map(x => {
                cuerpo += "<p><b>"+ x.nombre+"</b></br>"
                cuerpo += ""+ x.email+"</br>"
                cuerpo += ""+ x.telefono+"</br>"
                cuerpo += ""+ x.asunto+"</br>"
                cuerpo += ""+ x.mensaje+"</p>"
        
            });
            cotizacionesId.innerHTML = cuerpo
    
        }else{
          cuerpo += "<p><b>Sin Información</b></br></p>"
          cotizacionesId.innerHTML = cuerpo
        }
    }
        const getNoticias = () => {
        let api = 'https://corona.lmao.ninja/v3/covid-19/all'
        
        fetch(api,{
            method: 'GET',
            mode: 'cors',
            credentials : 'same-origin',
	        headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://127.0.0.1:5500/",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        	},
            referrerPolicy: 'no-referrer',
        })
            .then((res) => res.json())
            .then((data) => {
                  console.log('noticias', data.cases);
                  let seccionArticulos = document.getElementById("seccionArticulos")
                  let cuerpo = "<article><h2>CORONAVIRUS EN EL MUNDO</h1></article>";
                  
                  cuerpo += "<article><h2>Casos Totales</h2>"
                  cuerpo += "<p>"+ data.cases +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Casos Hoy</h2>"
                  cuerpo += "<p>"+ data.todayCases +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Muertes Totales</h2>"
                  cuerpo += "<p>"+ data.deaths +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Muertes Hoy</h2>"
                  cuerpo += "<p>"+ data.todayDeaths +"</p>"
                  cuerpo += "</article>"
                  
                  cuerpo += "<article><h2>Total Recuperados</h2>"
                  cuerpo += "<p>"+ data.recovered +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Recuperados Hoy</h2>"
                  cuerpo += "<p>"+ data.todayRecovered +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Casos Activos</h2>"
                  cuerpo += "<p>"+ data.active +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Casos Críticos</h2>"
                  cuerpo += "<p>"+ data.critical +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Casos Por Millón</h2>"
                  cuerpo += "<p>"+ data.casesPerOneMillion +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Muertes Por Millón</h2>"
                  cuerpo += "<p>"+ data.deathsPerOneMillion +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Vacunados</h2>"
                  cuerpo += "<p>"+ data.tests +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Vacunados por Millón</h2>"
                  cuerpo += "<p>"+ data.testsPerOneMillion +"</p>"
                  cuerpo += "</article>"

                  cuerpo += "<article><h2>Países Afectados</h2>"
                  cuerpo += "<p>"+ data.affectedCountries +"</p>"
                  cuerpo += "</article>"

                  seccionArticulos.innerHTML = cuerpo

                  let asideId = document.getElementById("asideId")
          
                  cuerpo = "<h3>Resúmen</h3>"
                  cuerpo += "<p><b>Países Afectados</b></br>"
                  cuerpo += ""+ data.affectedCountries+"</p>"
                  cuerpo += "<p><b>Casos Totales</b></br>"
                  cuerpo += ""+ data.cases +"</p>"
                  cuerpo += "<p><b>Muertes Totales</b></br>"
                  cuerpo += ""+ data.deaths +"</p>"
                  cuerpo += "<p><b>Recuperados Totales</b></br>"
                  cuerpo += ""+ data.recovered +"</p>"
                  asideId.innerHTML = cuerpo
                })
            .catch((err) => console.log(err));
        };
       
      
let onClick_enviarCotizacion = (e) =>{
  //Cargar Archivos ya existentes
  let dataStorage = localStorage["cotizaciones"]
  console.log("onClick_enviarCotizacion", dataStorage)
  if(!dataStorage){
    dataStorage = "[]"
  }

  let data = JSON.parse(dataStorage);
    //VALIDAR
    let nombre = document.getElementById("txtNombre").value
    let email = document.getElementById("txtEmail").value
    let telefono = document.getElementById("txtTelefono").value
    let asunto = document.getElementById("txtAsunto").value
    let mensaje = document.getElementById("txtMensaje").value

    if(nombre == "" || !nombre){
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debes ingresar un nombre',
            showConfirmButton: false,
            timer: 1500
          })
        return
    }

    if(email == "" || !email){
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debes ingresar un email',
            showConfirmButton: false,
            timer: 1500
          })
        return
    }

    if(telefono == "" || !telefono){
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debes ingresar un teléfono',
            showConfirmButton: false,
            timer: 1500
          })
        return
    }
    if(asunto == "" || !asunto){
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debes ingresar un asunto',
            showConfirmButton: false,
            timer: 1500
          })
        return
    }
    if(mensaje == "" || !mensaje){
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Hemos estado trabajando muchisimo pero aún nos falta para ser adivinos, por favor ingresa un mensaje...=D',
            showConfirmButton: false,
            timer: 1500
          })
        return
    }

    console.log("nombre", nombre)
    console.log("email", email)
    console.log("telefono", telefono)
    console.log("asunto", asunto)
    console.log("mensaje", mensaje)

    data.push({ 
        "nombre"    : nombre,
        "email"  : email,
        "telefono"    : telefono, 
        "asunto"    : asunto,
        "mensaje"    : mensaje,
    });
    console.log('data', data)
    //guardar al archivo
    let jsonData = JSON.stringify(data);
    localStorage["cotizaciones"] = jsonData;
    getCotizaciones();
    
    //borrar
    document.getElementById("txtNombre").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtTelefono").value = ""
    document.getElementById("txtAsunto").value = ""
    document.getElementById("txtMensaje").value = ""

    Swal.fire(
        'Información enviada correctamente',
        'Pronto nos pondremos en contacto contigo',
        'success'
      )


}