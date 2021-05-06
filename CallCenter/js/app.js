require(['dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom',
    "dojo/on", "dojo/request", "dojo/dom-construct", "dojo/dom-attr",
    "dojox/grid/enhanced/plugins/Pagination", "dijit/form/Textarea", 'dojox/validate/web', 'dojox/form/PasswordValidator', 'dojo/when', 'dojo/domReady!'],

    function (EnhancedGrid, ItemFileWriteStore, dom, on, request, domConstruct, domAttr,
        Pagination, Textarea, validate, PasswordValidator, when) {

        const url = "https://60870b4fa3b9c200173b7792.mockapi.io/Reclamos/";
        let botonBuscar = dom.byId("btnbuscar");
        let botonAgregar = dom.byId("btnagregar");
        let botonRegistrar = dom.byId("btnregistro");
        let botonLogin = dom.byId("btniniciar");
        let botonCancelar = dom.byId("btncancelar");
        let botonEnviar = dom.byId("btnenviar");
        let registros = [];

        /*set up layout*/
        let layout = [
            [{
                'name': 'Código',
                'field': 'Codigo',
                width: "75px"
            }, {
                'name': 'Fecha',
                'field': 'Fecha',
                width: "90px"
            }, {
                'name': 'Estado',
                'field': 'Estado',
                width: "105px"
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
                width: "190px"
            }]
        ];
        /*set up data store*/
        var data = {
            identifier: 'id',
            items: registros,
        };
        let store = new ItemFileWriteStore({ data: data });
        /*create a new grid:*/
        var grid = new EnhancedGrid({
            id: 'grid',
            store: store,
            plugins: {
                pagination: {
                    position: "bottom",
                    sizeSwitch: false,
                    gotoButton: true,
                    defaultPageSize: 5,
                },
            },
            editable: true,
            structure: layout,
            rowSelector: '10px'
        },
            document.createElement('div'));

        /*append the new grid to the div*/
        dom.byId("tablaGrid").appendChild(grid.domNode);

        /*Call startup() to render the grid*/
        grid.startup();

        function searchReclamo() {
            var codigoReclamo = dom.byId("codigoReclamo").value;
            request.get(url + codigoReclamo, {
                handleAs: "json"
            })
                .then(
                    function (res) {
                        const registro = {
                            Codigo: res.Codigo,
                            Fecha: res.Fecha_De_Inicio,
                            Estado: res.Estado,
                            Nombre: res.NombreyApellido,
                            Tipo: res.Tipo,
                            Descripcion: res.Descripcion,
                            Email: res.Email,
                        };
                        registros.pop();
                        registros.push(registro);
                        refreshGrid(registros);
                    })

        }
        function refreshGrid(registros) {
            var data = {
                identifier: 'Codigo',
                items: registros
            };
            let store = new ItemFileWriteStore({ data: data });
            grid.store = store;
            grid.render();
        }

        /*Asigno la funcion de buscar reclamo al evento de presionar el boton de buscar
          y al de presionar la tecla ENTER*/
        on(btnbuscar, "click", function (event) {
            let tgrid = dom.byId("tablaGrid");
            domAttr.set(tgrid, "style", { visibility: "visible" });
            searchReclamo();
            var data = {
                identifier: 'id',
                items: registros
            };
            let store = new ItemFileWriteStore({ data: data });
            grid.store = store;
            grid.render();
        });
        var ENTER = 13;
        on(document, "keyup", function (event) {
            if (event.keyCode == ENTER) {
                var codigo = dom.byId("codigoReclamo").value;
                if (codigo != "") {
                    let tgrid = dom.byId("tablaGrid");
                    domAttr.set(tgrid, "style", { visibility: "visible" });
                    searchReclamo();
                    var data = {
                        identifier: 'id',
                        items: registros
                    };
                    let store = new ItemFileWriteStore({ data: data });
                    grid.store = store;
                    grid.render();
                }

            }
        });
        /*hago visible el formulario cuando apreto en añadir un reclamo*/
        on(botonAgregar, "click", function (event) {
            myDialog.show();
        });
        on(botonRegistrar, "click", function (event) {
            registro.show();
            //let usuarioyaregistrado = false;
            //let username = document.getElementById("codigoReclamo").value;
            //const urlsub = "https://60870b4fa3b9c200173b7792.mockapi.io/Login/";
            
        });
    }
);