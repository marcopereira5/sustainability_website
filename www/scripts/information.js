/**
 * @class Guarda toda a informação necessária para a manutenção e suporte ao website
 * @constructs Informacao
 * 
 * @property {user[]} users - Array de objetos do tipo Userm para guardar todas as pessoas do sistema
 */
function Information(){
    this.users = [];
    console.log(this.users);
}

Information.prototype.getUsers = function () {
    return this.users;
}

Information.prototype.processAddUser = function () {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var newUser = new User(1, username, email, password);

    const self = this;

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(xhr.response);
            newUser = new User(xhr.response.upserted[0]._id, username, email, password);
            self.users.push(newUser);
            window.location.replace("/login");
        }
    }
    xhr.open('POST', '/register/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(newUser);
    xhr.send(JSON.stringify(newUser));
}

Information.prototype.importUsers = function () {
    var users = this.users;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/users", true);

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            console.log(response.user);
            response.user.forEach(element => {
                users.push(new User(element._id, element.username, element.email, element.password));
            });
        }
    }

    xhr.send();
}


Information.prototype.loginUser = function () {
    var username = document.getElementById("username_login").value;
    var password = document.getElementById("password_login").value;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = function() {
        console.log(xhr.response);
    }

    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"username": username, "password": password}));
}