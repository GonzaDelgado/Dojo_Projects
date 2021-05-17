function crearDialogo(idRef,title,id,href) {
    require(['dojo/dom', 'dijit/Dialog', 'dojo/dom-construct', 'dojo/domReady!'], 
        function(dom, Dialog, domConstruct){
            let div = dom.byId(idRef);
            myDialog = new Dialog({
                title: title,
                style: "width: 50%;",
                onHide: function()
                {this.destroyRecursive()},
                id: id,
                class: "text-center",
                href: href
            });
            let dialogo = domConstruct.toDom(myDialog);
            domConstruct.place(dialogo,div);
            //seteo las opciones para los combobox
            //setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Estados`,"estadoCmbbox", "estados", "estado");
            //setOptions(`https://60870b4fa3b9c200173b7792.mockapi.io/Tipo`,"tipoCmbbox", "tipos", "tipo");
            
            myDialog.show();
        });
    
}
/*require(['dojo/dom', 'dijit/Dialog', 'dojo/dom-construct', 'dojo/domReady!'], 
        function(dom, Dialog, domConstruct){
            let divAddReclamo = dom.byId("agregarReclamo");
            var myDialog = new Dialog({
                title: "Agregar Reclamo",
                style: "width: 50%;",
                id: "myDialog",
                class: "text-center",
                href: "./html/DialogAddReclamo.html"
            });
            let agregarReclamo = domConstruct.toDom(myDialog);
            domConstruct.place(agregarReclamo,divAddReclamo);
        });*/
