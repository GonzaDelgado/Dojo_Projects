require(['dojox/grid/EnhancedGrid', 'dojo/data/ItemFileWriteStore', 'dojo/dom',
    "dojo/on", "dojo/request", "dojo/dom-construct", "dojo/dom-attr",
    "dojox/grid/enhanced/plugins/Pagination", 'dojo/domReady!'],

    function (EnhancedGrid, ItemFileWriteStore, dom, on, request, domConstruct, domAttr,
        Pagination) {

        const url = "https://pokeapi.co/api/v2/pokemon/";
        let pokeArray = [];
        let botonRefresh = dom.byId("botonRefresh");

        /*set up layout*/
        let layout = [
            [{
                'name': 'Nombre',
                'field': 'Nombre'
            }, {
                'name': 'Altura',
                'field': 'Altura'
            }, {
                'name': 'Peso',
                'field': 'Peso'
            }, {
                'name': 'Tipo',
                'field': 'Tipo'
            }, {
                'name': 'Nro. Id',
                'field': 'Id',

            }, {
                name: "Frente",
                field: "Frente",
                formatter: (Frente) => {

                    return `<img alt="" src="${Frente}" height='100px'/>`;
                }
            }, {
                name: "Espalda",
                field: "Espalda",
                formatter: (Espalda) => {

                    return `<img alt="" src="${Espalda}" height='100px'/>`;
                }
            }]
        ];
        /*set up data store*/
        var data = {
            identifier: 'id',
            items: pokeArray
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
            rowSelector: '20px'
        },
            document.createElement('div'));

        /*append the new grid to the div*/
        dom.byId("tablaGrid").appendChild(grid.domNode);

        /*Call startup() to render the grid*/
        grid.startup();

        function searchPokemon() {
            var pokemonId = dom.byId("pokeStore").value;
            request.get(url + pokemonId, {
                handleAs: "json"
            })
                .then(
                    function (res) {
                        const pokeObjeto = {
                            id: pokeArray.length,
                            Nombre: res.name,
                            Tipo: res.types[0].type.name,
                            Altura: Math.round(res.height * 10),
                            Peso: Math.round(res.weight / 10),
                            Id: res.id,
                            Frente: res.sprites.front_default,
                            Espalda: res.sprites.back_default,
                        };
                        pokeArray.push(pokeObjeto);
                        refreshGrid(pokeArray);

                        let tabla = dom.byId("tablaHtml");
                        domAttr.set(tabla, "style", { visibility: "visible" });

                        let node = domConstruct.create("tr", {
                            innerHTML: `<td>${pokeObjeto.Nombre}</td> <td>${pokeObjeto.Altura}</td> <td>${pokeObjeto.Peso}</td> <td>${pokeObjeto.Tipo}</td>  <td>${pokeObjeto.Id}</td>  <td><img alt="" src="${pokeObjeto.Frente}"/></td>  <td><img alt="" src="${pokeObjeto.Espalda}"/></td>`,
                        });
                        domConstruct.place(node, tabla);
                    })

        }
        function refreshGrid(pokeArray) {
            var data = {
                identifier: 'id',
                items: pokeArray
            };
            let store = new ItemFileWriteStore({ data: data });
            grid.store = store;
            grid.render();
        }

        /*Asigno la funcion de buscar pokemon al evento de presionar el boton de buscar
          y al de presionar la tecla ENTER*/
        on(botonRefresh, "click", function (event) {
            let tgrid = dom.byId("tablaGrid");
            domAttr.set(tgrid, "style", { visibility: "visible" });
            searchPokemon();
            var data = {
                identifier: 'id',
                items: pokeArray
            };
            let store = new ItemFileWriteStore({ data: data });
            grid.store = store;
            grid.render();
        });
        var ENTER = 13;
        on(document, "keyup", function (event) {
            if (event.keyCode == ENTER) {
                var pokemonId = dom.byId("pokeStore").value;
                if (pokemonId != "") {
                    let tgrid = dom.byId("tablaGrid");
                    domAttr.set(tgrid, "style", { visibility: "visible" });
                    searchPokemon();
                    var data = {
                        identifier: 'id',
                        items: pokeArray
                    };
                    let store = new ItemFileWriteStore({ data: data });
                    grid.store = store;
                    grid.render();
                }

            }
        });
    });