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
    const self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/users", true);

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            response.user.forEach(element => {
                console.log(element);
                self.users.push(new User(element._id, element.name, element.email, element.password));
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
            window.location = "/forum";
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"name": name, "text": text}));
}

Information.prototype.importThreads = function () {
    const self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/threads");

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            response.thread.forEach(element => {
                self.threads.push(new Thread(element._id, element.name, element.date, element.text, element.user, element.replies));
            });
        }

        console.log(self.threads);
    }

    xhr.send();
}

Information.prototype.showThreads = function() {
    var tbody = document.getElementById("t_threads");

    tbody.innerHTML = "";

    this.threads.forEach(element =>{
        tbody.innerHTML += "<tr> <th scope='row'>" + element.name + "</th> <td>" + element.creationDate + "</td>"
        + "<td>" + element.text + "</td> <td>" + element.replies.length + "</td> <td> <button class='btn btn-primary' onclick='javascript:info.replyThread(\"" + element.id +"\");showReplies()'> Reply </button> </td> </tr>" ;
    });
}

Information.prototype.replyThread = function(id){
    var thread;
    var user;

    document.getElementById("forum").style.display = "none";

    this.threads.forEach(element => {
        if (element.id == id){
            thread = element;
        }
    });

    this.users.forEach(element => {
        if (element.id == thread.user.id){
            user = element;
        }
    });

    var table_cell = document.getElementById("t_replies");

    console.log(user);

    table_cell.innerHTML = "<tr> <th scope='row'> <p>Thread Name: " + thread.name + "</p><p>Creation Date: " + thread.creationDate + "</p><p>User name: " + user.name + "</p></th>" +
    "<td>" + thread.text + "</td></tr>";

    console.log(thread.replies);
    
    thread.replies.forEach(element =>{
        table_cell.innerHTML += "<tr> <th scope='row'> <p>Date: " + element.creationDate + "</p><p>User: " + element.user.username + "</p></th>" +
        "<td>" + element.text + "</td></tr>";
    });

    document.getElementById("button_r").innerHTML = '<button class="btn btn-primary" onclick="javascript:info.addReply(\'' + id + '\')">Submit</button>'
}

Information.prototype.addReply = function(id){
    var thread;
    var text = document.getElementById("text_r").value;

    this.threads.forEach(element => {
        if (element.id == id){
            thread = element;
        }
    });

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/threads");
    const self = this;

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var response = JSON.parse(xhr.responseText);
            thread.addReply(new Reply(Math.random(), response.date, text, response.user));
            self.replyThread(id);
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"text": text, "id": id}));
}

Information.prototype.getUser = function(){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/user");
    const self = this;

    xhr.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)){
            var a = JSON.parse(xhr.responseText);
            console.log(a);
            document.getElementById("name_i").textContent = "Hello " + a.user[0].name + "!";
            document.getElementById("new_username").placeholder = a.user[0].name;
            document.getElementById("new_email").placeholder = a.user[0].email;
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

Information.prototype.updateUser = function(){
    var username = document.getElementById("new_username").value;
    var email = document.getElementById("new_email").value;
    var password = document.getElementById("new_password").value;
    var id;
    var user;
    
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/users");
    const self = this;

    xhr.onreadystatechange = function() {
        console.log(this.readyState + " - " + this.status);
        if ((this.readyState == 4) && (this.status == 200)){
            user.name = username;
            user.email = email;
            user.password = password;
            window.location.reload();
        }
    }

    this.users.forEach(element =>{
        if (element.name == document.getElementById("new_username").placeholder){
            user = element;
            id = element.id;
        }
    });

    xhr.onreadystatechange = function() {
        console.log(this.readyState + " - " + this.status);
        if ((this.readyState == 4) && (this.status == 200)){
            user.name = username;
            user.email = email;
            user.password = password;
            window.location.reload();
        }
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({"username": username, "email": email, "password": password, "id": id}));
}

Information.prototype.logout = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/logout");
    const self = this;

    xhr.onreadystatechange = function() {
        console.log(this.readyState + " - " + this.status);
        if ((this.readyState == 4) && (this.status == 200)){
            window.location = "/";
        }
    }

    xhr.send();
}

