require(['dijit/registry', 'dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom',
    "dojo/on", "dojo/request", "dojox/grid/enhanced/plugins/Pagination", "dijit/form/Textarea", 
    'dojox/validate/web', 'dojox/form/PasswordValidator', 'dijit/Dialog', 'dojo/domReady!'],

    function (registry, EnhancedGrid, ItemFileWriteStore, dom, on, request) {

        const url = "https://60870b4fa3b9c200173b7792.mockapi.io/Reclamos/";
        let botonBuscar = dom.byId("btnbuscar");
        let botonAgregar = dom.byId("btnagregar");
        let botonRegistrar = dom.byId("btnregistro");
        let botonLogin = dom.byId("btniniciar");
        let botonLogout = dom.byId("btnlogout");
        let botonCancelar = dom.byId("btncancelar");
        let botonEnviar = dom.byId("btnenviar");
        let registros = [];
        actualizarLogin();

        /*set up layout*/
        let layout = [
            [{
                'name': 'Código',
                'field': 'Codigo',
                width: "44px"
            }, {
                'name': 'Fecha',
                'field': 'Fecha',
                width: "90px"
            }, {
                'name': 'Estado',
                'field': 'Estado',
                width: "125px"
            }, {
                'name': 'Nombre Completo',
                'field': 'Nombre',
                width: "165px"
            }, {
                'name': 'Tipo',
                'field': 'Tipo',
                width: "105px"

            }, {
                'name': 'Descripción',
                'field': 'Descripcion',
                width: "190px"
            }, {
                'name': 'Email',
                'field': 'Email',
                width: "195px"
            }]
        ];
        /*set up data store*/
        var data = {
            identifier: 'Codigo',
            items: registros,
        };
        let store = new ItemFileWriteStore({ data: data });
        /*create a new grid:*/
        var grid = new EnhancedGrid({
            id: 'grid',
            store: store,
            autoWidth: true,
            //autoHeight: true,
            //width: '1000px',
            margin: 'auto',
            height: '400px',
            structure: layout,
            rowSelector: '8px'
        },
            document.createElement('div'));

        /*append the new grid to the div*/
        dom.byId("tablaGrid").appendChild(grid.domNode);

        /*Call startup() to render the grid*/
        grid.startup();

        function searchReclamo(value) {
            let urlFinal;
            if(typeof value == 'string'){
                urlFinal = url + '?search=' + value;
            } else{
                value = value + ""; 
                urlFinal = url + value;
            }
            request.get(urlFinal, {
                handleAs: "json"
            })
                .then(
                    function (res) {
                        if(res.length > 1){
                            registros = [];
                            res.forEach(function(r) {
                                const registro = {
                                    Codigo: r.Codigo,
                                    Fecha: r.Fecha_De_Inicio,
                                    Estado: r.Estado,
                                    Nombre: r.NombreyApellido,
                                    Tipo: r.Tipo,
                                    Descripcion: r.Descripcion,
                                    Email: r.Email,
                                };
                                registros.push(registro);
                            });
                        } else{
                            registros = [];
                            const registro = {
                                Codigo: res.Codigo,
                                Fecha: res.Fecha_De_Inicio,
                                Estado: res.Estado,
                                Nombre: res.NombreyApellido,
                                Tipo: res.Tipo,
                                Descripcion: res.Descripcion,
                                Email: res.Email,
                            };
                            registros.push(registro);
                        }
                        refreshGrid(registros);
                    })

        }
        function refreshGrid(registros) {
            var data = {
                identifier: 'Codigo',
                items: registros
            };
            let store = new ItemFileWriteStore({ data: data });
            //grid.destroy();
            grid.store = store;
            grid.render();
        }

        /*Asigno la funcion de buscar reclamo al evento de presionar el boton de buscar
          y al de presionar la tecla ENTER*/
        on(btnbuscar, "click", function (e) {
            var tab = registry.byId("tabContainer");
            dojo.query('#tablaGrid').style('display', 'block');
            var codigoReclamo = dom.byId("codigoReclamo").value;
            var tipo = dom.byId("tipoSCmbbox").value;
            var estado = dom.byId("estadoSCmbbox").value;
            if(codigoReclamo !== ""){
                let codigo = parseInt(codigoReclamo);
                searchReclamo(codigo);
                dojo.query('#resultados').style('display', 'content');
            }
            if(tipo !== ""){
                searchReclamo(tipo);
                dojo.query('#resultados').style('display', 'content');
            }
            if(estado !== ""){
                searchReclamo(estado);
                dojo.query('#resultados').style('display', 'content');
            }
            tab.selectChild(registry.byId("resultContainer"));
        });
        var ENTER = 13;
        on(document, "keyup", function (event) {
            if (event.keyCode == ENTER) {
                var tab = registry.byId("tabContainer");
                dojo.query('#tablaGrid').style('display', 'block');
                var codigo = dom.byId("codigoReclamo").value;
                var tipo = dom.byId("tipoSCmbbox").value;
                var estado = dom.byId("estadoSCmbbox").value;
                if (codigo != "") {
                    let cod = parseInt(codigo);
                    searchReclamo(cod);
                }
                if(tipo !== ""){
                    searchReclamo(tipo);
                }
                if(estado !== ""){
                    searchReclamo(estado);
                }
                tab.selectChild(registry.byId("resultContainer"));
            }
        });
        /*hago visible el formulario cuando apreto en añadir un reclamo*/
        on(botonAgregar, "click", function (event) {
            crearDialogo("agregarReclamo","Agregar Reclamo","myDialog","./html/DialogAddReclamo.html");
            setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Estados`,"estadoCmbbox", "estados", "estado","form-control");
            setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Tipo`,"tipoCmbbox", "tipos", "tipo","form-control");
            //myDialog.show();
        });
        on(botonRegistrar, "click", function (event) {
            crearDialogo("registerForm","Registrar Usuario","registro","./html/DialogLogUp.html");
            //registro.show();
        });
        on(botonLogin, "click", function (event) {
            crearDialogo("divLogin","Iniciar Sesión","login","./html/DialogLogIn.html");
            //login.show();
        });
        on(botonLogout, "click", function (event) {
            cerrarSesion.show();
        });
    }
);