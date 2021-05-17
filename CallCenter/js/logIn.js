function actualizarLogin() {
    //Tengo que resetear la tabla grid
    dojo.query('#tablaGrid').style('display', 'none');
    if (localStorage.getItem("Username") !== null) {
        //Si se inicio sesión debo dar bienvenida, ocultar boton de registrarse y inicio de sesion, 
        //mostrar boton de cerrar sesion.
        let usuario = localStorage.getItem('Username');
        require(["dojo/html", "dojo/dom", "dojo/domReady!"],
            function (html, dom) {
                html.set(dom.byId("bienvenido"), "Bienvenido " + usuario + "!!");
            });
        //Oculto los botones de iniciar sesion y registrarse
        dojo.query('#btniniciar').style('display', 'none');
        dojo.query('#btnregistro').style('display', 'none');
        //muestro el boton de cerrar sesion y el de consultar reclamo
        dojo.query('#btnlogout').style('display', 'inline');
        dojo.query('#consultarReclamo').style('display', 'contents');
        dojo.query('#divConsultar').style('display', 'inline');
        //Veo si el usuario es empleado o no para mostrar el boton de añadir reclamo
        if(localStorage.getItem('employeeId') !== '0'){
            dojo.query('#btnagregar').style('display', 'inline');
        } else{
            dojo.query('#btnagregar').style('display', 'none');
        }
    } else {
        require(["dojo/html", "dojo/dom", "dojo/domReady!"],
            function (html, dom) {
                html.set(dom.byId("bienvenido"), "Invitado");
            });
        //oculto el boton de consultar reclamo y el de agregar reclamo
        dojo.query('#btnagregar').style('display', 'none');
        dojo.query('#consultarReclamo').style('display', 'none');
        dojo.query('#divConsultar').style('display', 'none');
        //oculto el boton de cerrar sesion
        dojo.query('#btnlogout').style('display', 'none');
        //muestro los botones de iniciar sesion y registrarse
        dojo.query('#btniniciar').style('display', 'inline');
        dojo.query('#btnregistro').style('display', 'inline');
    }
}

function verificarLogin(username, password) {
    const urlsub = "https://60870b4fa3b9c200173b7792.mockapi.io/Login/";
    let res;
    let invalido = false;
    require(["dojo/request"], function (request) {
        //busco al usuario en la api
        request.get(urlsub + "?search=" + username, {
            handleAs: "json"
        }).then(function (response) {
            //veo si existe el usuario
            if (response.length < 1) {
                //si no existe muestro popup que diga datos invalidos
                invalido = true;
            } else {
                //Si el usuario existe comparo las contraseñas
                let user = response[0];
                var result = user.password.localeCompare(password);
                if (result !== 0) {
                    //si no coinciden las contraseñas
                    invalido = true;
                }
            }
            if (invalido) {
                invalid.show();
                res = false;
            } else {
                localStorage.Username = username;
                localStorage.employeeId = response[0].idEmployee;
                actualizarLogin();
                sesionIniciada.show();
                res = true;
            }
        });
    });
    return res;
}