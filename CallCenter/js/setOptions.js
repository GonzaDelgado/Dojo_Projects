function setOptions(url, id, name, idRef, clase) {
    require(["dojo/request", "dojo/store/Memory", "dojo/when", "dojo/Deferred",
        "dijit/form/FilteringSelect", "dojo/domReady!"],
        function (request, Memory, when, Deferred, FilteringSelect) {
            var deferred = new Deferred();
            let descripciones = [];
            return request.get(url, {
                handleAs: "json"
            })
                .then(
                    function (lista) {

                        let cont = 1;
                        const funcion = lista.map((value) => value.descripcion).forEach(element => {
                            descripciones.push({

                                descripcion: element
                            });
                            cont++;
                        });
                        var store = new Memory({
                            data: descripciones
                        });
                        var filteringSelect = new FilteringSelect({
                            id: id,
                            name: name,
                            value: "",
                            class: clase,
                            store: store,
                            readonly: true,
                            placeholder: "--Seleccione--",
                            searchAttr: "descripcion"
                        }, idRef);
                    })
        });
}

//Seteo las opciones de estado y de tipo del search
setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Estados`,"estadoSCmbbox", "estadosSearch", "estadoSearch","");
setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Tipo`,"tipoSCmbbox", "tiposSearch", "tipoSearch","");
