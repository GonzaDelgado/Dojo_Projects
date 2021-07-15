/*require(["dojo/_base/array", "dojo/_base/event", "dojo/query", "dojox/validate/web", "dojox/validate/us", "dojox/validate/check", "dojo/domReady!"],
    function (arrayUtil, baseEvent, query, validate) {

        function doCheck(form) {
            var results = validate.check(form, profile);

            if (results.isSuccessful()) {
                //	Si los campos estan correctos llamo a la funcion que realiza el post a la mockapi
                agregarReclamo();
            } else {
                var s = "";
                var missing = results.getMissing();
                if (missing.length) {
                    s += '<h4 class="resCamposInvalidos">Olvidaste completar los siguientes campos:</h4>'
                        + '<ol class="resCamposInvalidos">';
                    arrayUtil.forEach(missing, function (campo) {
                        s += '<li>' + campo + '</li>';
                    });
                    s += '</ol>';
                }

                var invalid = results.getInvalid();
                if (invalid.length) {
                    s += '<h4 class="resCamposInvalidos">Los siguientes campos son invalidos:</h4>'
                        + '<ol class="resCamposInvalidos">';
                    arrayUtil.forEach(invalid, function (field) {
                        s += '<li>' + field + '</li>';
                    });
                    s += '</ol>';
                }
                var buttonCerrar = `<div class="dijitDialogPaneActionBar" id="camposInvalidosBtnPanel">
                                        <button data-dojo-type="dijit/form/Button" type="button" onClick="camposInvalidos.hide();" id="cerrarCamposInv"
                                            class="buttonRed">Ok</button>
                                    </div>`;
                camposInvalidos.set("content",s + buttonCerrar);
                camposInvalidos.show();
            }
        }

        //	wait until after our requires are actually loaded.
        profile = {
            trim: ["nombreyApellido"],
            required: ["nombreyApellido", "estadoCmbbox", "tipoCmbbox", "email", "confirmarEmail"],
            constraints: {
                nombreyApellido: validate.isText,
                estadoCmbbox: validate.isText,
                tipoCmbbox: validate.isText,
                email: [validate.isEmailAddress, false, true],
                confirmarEmail: [validate.isEmailAddress, false, true]
            },
            confirm: {
                "confirmarEmail": "email"
            }
        };

        //	set up the form handler.

        var f = query("#myForm")[0];
        f.onsubmit = function (e) {
            baseEvent.stop(e);
            doCheck(f);
        };
    });*/
/*   
require(["dojo/domReady!"],function() {
   var f = $('#myForm');
   f.onsubmit = function (e) {
       baseEvent.stop(e);
       doCheck(f);
   };
});*/

function validar(form) {
    let nombreyApellido = document.getElementById("nombreyApellido").value;
    let estadoCmbbox = document.getElementById("estadoCmbbox").value;
    let tipoCmbbox = document.getElementById("tipoCmbbox").value;
    let email = document.getElementById("email").value;
    let confirmarEmail = document.getElementById("confirmarEmail").value;
    let campos = [nombreyApellido, estadoCmbbox, tipoCmbbox, email];
    let res = false;
    if (email != confirmarEmail) {
        emailAlert.show();
        return false;
    }
    if (form.validate()) {
        agregarReclamo();
        res = true;
    } else {
        let inv = invalidos(campos);
        let mensaje = msjInvalidos(inv);
        mostrarInvalidos(mensaje);
        res = false;
    }
    return res;
}

function invalidos(array) {
    let res = [];
    require(["dojox/validate/web"], function (validate) {
        if (!validate.isText(array[0])) {
            res.push('nombreyApellido');
        }
        if (!validate.isText(array[1])) {
            res.push('estadoCmbbox');
        }
        if (!validate.isText(array[2])) {
            res.push('tipoCmbbox');
        }
        if (!validate.isEmailAddress(array[3], false, true)) {
            res.push('email');
        }
    });
    return res;
}

function msjInvalidos(campos) {
    let html = "<h4>Los siguientes campos son invalidos</h4><br/>";

    campos.forEach(element => {
        let nombre = $('#' + element).attr('id');
        html += `<p>${nombre}</p>`
    });
    return html;
}

function mostrarInvalidos(mensaje) {
    var buttonCerrar = `<div class="dijitDialogPaneActionBar" id="camposInvalidosBtnPanel">
                        <button data-dojo-type="dijit/form/Button" type="button" onClick="camposInvalidos.hide();" id="cerrarCamposInv"
                        class="buttonRed">Ok</button>
                        </div>`;
    camposInvalidos.set("content", mensaje + buttonCerrar);
    camposInvalidos.show();
}

function agregarReclamo() {
    const data = {
        'Estado': document.getElementById("estadoCmbbox").value,
        'NombreyApellido': document.getElementById("nombreyApellido").value,
        'Tipo': document.getElementById("tipoCmbbox").value,
        'Descripcion': document.getElementById("descripcion").value,
        'Email': document.getElementById("email").value
    };
    const urlsub = "https://60870b4fa3b9c200173b7792.mockapi.io/Reclamos/";
    require(["dojo/request"], function (request) {
        request.post(urlsub, {
            handleAs: "json",
            data: data
        }).then(function (text) {
            console.log("El servidor retornó: ", text);
        });
    });
    exito.show();
    myDialog.hide();
}