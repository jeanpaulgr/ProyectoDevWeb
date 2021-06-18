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
            if(tipo == 1){
            getArticulos()    
            }else{
            getArticulos()    
            } 
        }
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
let onClick_enviarCotizacion = (e) =>{
  //Cargar Archivos ya existentes
  let dataStorage = localStorage["cotizaciones"]
  console.log("onClick_enviarCotizacion", dataStorage)
  if(!dataStorage){
    dataStorage = "[]"
  }

  let data = JSON.parse(dataStorage);
    // console.log("data", data)
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