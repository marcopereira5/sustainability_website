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

/**
 * Esta função retorna uma lista de utilizadores
 * @returns {user[]} lista de utilizadores
 */
Information.prototype.getUsers = function () {
    return this.users;
}

/**
 * Esta função processa um novo utilizador, para o seu registo na base de dados
 * São recolhidos os dados necessários, fornecidos pelo utilizador, referentes ao
 * username, email e password que irão originar um novo utilizador
 * @function processAddUser adiciona/regista um novo utilizador
 */
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


/**
 * Esta função atualiza os dados de um utilizador, para o seu registo na base de dados
 * São recolhidos o username e/ou password, fornecidos pelo próprio utilizador.
 * @function processUpdateUser atualiza os dados de um utilizador
 */
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

/**
 * Esta função trata de importação dos utilizadores existentes da base de dados
 * @function importUsers importa os dados dos utilizadores
 */
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

/**
 * Esta função trata do login dos utilizadores, recebendo o username e password fornecidos pelo utilizadores
 * @function loginUser realiza o login de um utilizador
 */
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

/**
 * Esta função inicia um post/thread, dando a possibilidade de outros utilizadores mais tarde comentarem
 * @function addThread adiciona um post/thread
 */
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

/**
 * Esta função trata de importação dos posts/threads existentes da base de dados
 * @function importThreads importa os posts/threads
 */
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

/**
 * Através dos dados importados dos posts/threads, esta função trata de transpor
 * os dados importados para a lista de threads/posts existentes no fórum
 * @function showThreads mostra os posts existentes no fórum
 */
Information.prototype.showThreads = function() {
    var tbody = document.getElementById("t_threads");

    tbody.innerHTML = "";

    this.threads.forEach(element =>{
        tbody.innerHTML += "<tr> <th scope='row'>" + element.name + "</th> <td>" + element.creationDate + "</td>"
        + "<td>" + element.text + "</td> <td>" + element.replies.length + "</td> <td> <button class='btn btn-primary' onclick='javascript:info.replyThread(\"" + element.id +"\");showReplies()'> Reply </button> </td> </tr>" ;
    });
}

/**
 * Através dos dados importados dos posts/threads, esta função trata de transpor
 * os dados importados para a lista de respostas/comentários para cada post existente no fórum
 * @function replyThread mostra os comentários/respostas dos posts no fórum
 */
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

/**
 * Esta função adiciona uma resposta/comentáio a um post associando-o ao respetivo post
 * @function addReply adiciona comentários/respostas a um post
 */
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
