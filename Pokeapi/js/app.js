require(["dojo/dom", "dojo/on", "dojo/mouse", "dojo/request",
    "dojo/store/Memory", "dojo/json", "dojo/when", "dojo/Deferred",
    "dijit/form/FilteringSelect", "dojo/dom-construct", "dojo/html",
    "dojo/fx", "dojo/dom-style", "dojo/_base/fx", "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer", "dojo/domReady!"], function (dom, on, mouse,
        request, Memory, json, when, Deferred, FilteringSelect, domConstruct, html, coreFx,
        domStyle, fx) {

    function setOptions() {
        var deferred = new Deferred();
        let pokenombres = [];
        return request.get(`https://pokeapi.co/api/v2/pokemon/?limit=-1`, {
            handleAs: "json"
        })
            .then(
                function (response) {
                    let listaPokemon = response.results;

                    let cont = 1;
                    const nombres = listaPokemon.map((pokemon) => pokemon.name).forEach(element => {
                        pokenombres.push({

                            name: element,
                            value: element
                        });
                        cont++;
                    });
                    return pokenombres
                })
        return pokenombres
    }

    when(setOptions(), function obtenerPokemones(pokenombres) {
        var pokeStore = new Memory({
            data: pokenombres
        });
        var filteringSelect = new FilteringSelect({
            id: "pokeStore",
            name: "pokemons",
            value: "",
            store: pokeStore,
            searchAttr: "name"
        }, "pokemonName");
    });

});