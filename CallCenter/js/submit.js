function submitRegistro() {
    let formRegistro = document.getElementById("formRegistro");
    let username = document.getElementById("username").value;
    let email = document.getElementById("emailReg").value;
    let emailConf = document.getElementById("emailRegConf").value;
    let password = document.getElementById("pass").value;
    let passwordConf = document.getElementById("passConf").value;
    let employeeYes = document.getElementById("employeeYes").checked;
    let res = false;
    if (email != emailConf) {
        emailAlert.show();
        return false;
    }
    if (password != passwordConf) {
        passAlert.show();
        return false;
    }
    let isemployee = false;
    let id = 0;
    if (employeeYes) {
        isemployee = true;
        id = document.getElementById("employeeId").value;
    }
    if (formRegistro.validate()) {
        const data = {
            'username': username,
            'password': password,
            'email': email,
            'employee': isemployee,
            'idEmployee': id
        };
        const urlsub = "https://60870b4fa3b9c200173b7792.mockapi.io/Login/";
        let usuarioyaregistrado = false;
        require(["dojo/request"], function (request) {
            //Veo si el usuario ya esta registrado
            request.get(urlsub + "?search=" + username, {
                handleAs: "json"
            }).then(function (response) {
                if (response.length >= 1) {
                    usuarioyaregistrado = true;
                } else {
                    //Si el usuario no esta registrado lo registro
                    request.post(urlsub, {
                        handleAs: "json",
                        data: data
                    }).then(function (text) {
                        console.log("The server returned: ", text);
                    });
                }
                if (usuarioyaregistrado) {
                    usuarioregistrado.show();
                    res = false;
                } else {
                    exito.show();
                    dojo.query('#onlyEmployee').style('display', 'none');
                    registro.reset();
                    registro.hide();
                    res = true;
                }
            });
        });
    } else {
        alerta.show();
        res = false;
    }
    return res;
}