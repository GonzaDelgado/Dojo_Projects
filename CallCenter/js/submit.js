require(["dojo/_base/array", "dojo/_base/event", "dojo/query", "dojox/validate/web", "dojox/validate/us", "dojox/validate/check", "dojo/domReady!"],
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
    });
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
    myDialog.reset();
    myDialog.hide();
}