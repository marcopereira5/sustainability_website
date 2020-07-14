/**
 * @class Guarda toda a informação necessária para a manutenção e suporte ao website
 * @constructs Informacao
 * 
 * @property {user[]} users - Array de objetos do tipo User para guardar todas as pessoas do sistema
 * @property {thread[]} threads - Array de objetos do tipo Thread para guardar todas as pessoas do sistema
 */
function Information(){
    this.users = [];
    this.threads = [];
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
            window.location = "/login";
        }
    }
    xhr.open('POST', '/register/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(newUser);
    xhr.send(JSON.stringify(newUser));
}


Information.prototype.processUpdateUser = function () {
    var new_username = document.getElementById("new_username").value;
    var new_password = document.getElementById("new_password").value;
    var conf_password = document.getElementById("conf_password").value;
    var alert = document.getElementById("alert2");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if(new_username){
        if(new_password && new_password==conf_password){
            alert.textContent = "Username and password changed!";
            alert.style.color = "green";
            alert.style.textAlign = "center"; 
            xhr.open('PUT', '/Users/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({"name": new_username, "password": new_password}));  

        }else if(new_password && new_password!=conf_password){
            alert.textContent = "Passwords don't match";
            alert.style.color = "red";
            alert.style.textAlign = "center"; 
        }else{
            alert.textContent = "Username changed!";
            alert.style.color = "green";
            alert.style.textAlign = "center";
            xhr.open('PUT', '/Users/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({"name": new_username}));
        }

    }else{
        if(new_password && new_password==conf_password){
            alert.textContent = "Password changed!";
            alert.style.color = "green";
            alert.style.textAlign = "center";
            xhr.open('PUT', '/Users/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({"password": new_password}));
        }else if(new_password && new_password!=conf_password){
            alert.textContent = "Passwords don't match";
            alert.style.color = "red";
            alert.style.textAlign = "center"; 
        }
    }

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location = "/logged";
        }
    }
    xhr.open('PUT', '/Users/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"name": username, "password": password}));
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

Information.prototype.importCountries = function (){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/", true); 
    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            var main = document.getElementById('international');
            response.country.forEach(element => {
                let art = document.createElement("ARTICLE");
                let img = document.createElement("IMG");
                let h = document.createElement("H2");
                let par = document.createElement("p");
                img.setAttribute("src",element.img_src);
                img.setAttribute("alt",element.name);
                img.setAttribute("class","flags");
                art.appendChild(img);
                h.innerText = element.name;
                par.innerText = element.description;
                art.appendChild(h);
                art.appendChild(par);
                main.appendChild(art);
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
        console.log(this);
        if ((this.readyState == 4) && (this.status == 200)){
            window.location = "/logged";
        } else if ((this.readyState == 4) && (this.status == 401)){
            var alert = document.getElementById("alert");
            alert.textContent = "Please input a valid combination";
            alert.style.color = "red";
            alert.style.textAlign = "center";
        }
    }

    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"username": username, "password": password}));
}

Information.prototype.addThread = function () {
    var name = document.getElementById("thread_name").value;
    var text = document.getElementById("text").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/threads");

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            console.log(JSON.parse(xhr.responseText));
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"name": name, "text": text}));
}

Information.prototype.importThreads = function () {
    var threads = this.threads;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/threads");

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            response.thread.forEach(element => {
                threads.push(new Thread(element._id, element.name, element.date, element.text, element.user, element.replies));
            });
        }
    }

    xhr.send();
}

function showThreads() {
    this.importThreads();
    var tbody = document.getElementById("t_threads");

    console.log(this.threads);

    this.threads.forEach(element =>{
        tbody.innerHTML += "<tr> <th scope='row'>" + element.name + "</th> <td>" + element.creationDate + "</td>"
        + "<td>" + element.text + "</td> <td>" + element.replies + "</td> </tr>";
    });
}
