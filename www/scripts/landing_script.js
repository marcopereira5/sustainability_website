var introduction = document.querySelector('.introduction')
var mainPage = document.querySelector('.mainpage')
var about = document.querySelector('.about')
var menu = document.querySelector('.menu')
var tech_img = document.querySelector('#tech_img')
var toggle = document.querySelector('.labelResponsive')

var pages = document.getElementsByTagName('main');

var login;


try {
    var t1 = new TimelineMax();

    t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
    .fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");
    startPage();
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
} catch (e){

}

/**
 * 
 */
function startPage(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className != 'introduction'){
            pages[i].style.display = 'none'; 
        }
    }
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página 
 * dedicada à definição/introdução do tema e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showDefinition
 */
function showDefinition(){

    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='definition'){
            pages[i].style.display = 'block'; 
            mainPage.onscroll = function(){};
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página incial e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showMainPage
 */
function showMainPage(){
    window.scrollTo(0,0);

    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='introduction'){
            pages[i].style.display = 'block';  
        }else{
            pages[i].style.display = 'none'; 
        }
    }

    mainPage.className = 'mainpage';

    t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
    .fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página 
 * dedicada aos criadores/developers e mostrar esta mesmo.
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showAbout
 */
function showAbout(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='about'){
            pages[i].style.display = 'block';  
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página 
 * dedicada às iniciativas internacionais e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showInternational
 */
function showInternational(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='internacional'){
            pages[i].style.display = 'block';  
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página 
 * dedicada a projectos e tecnologias relacionadas com o tema e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showTech
 */
function showTech(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='tech'){
            pages[i].style.display = 'block';  
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página 
 * dedicada a projectos e iniciativas que estejam a ser desenvolvidas a um nivel universitário  do tema e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showUni
 */
function showUni(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='universities'){
            pages[i].style.display = 'block';
            pages[i].style.backgroundImage = 'none';
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada para esconder todas as secções que não sejam a página de edição do perfil e mostrar esta mesmo
 * Com a estruturação do html de main por secção, o método percorre a lista de mains
 * que é adquirida inicialmente e efetua as mudanças necessárias, conjugando ainda
 * uma pequena animação que definimos para cada página
 * @function showEdit
 */
function showEdit(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className=='edit'){
            pages[i].style.display = 'block';
            pages[i].style.backgroundImage = 'none';
            t1.fromTo(pages[i], 1, {opacity: "0"}, {opacity: "1"});
        }else{
            pages[i].style.display = 'none'; 
        }
    }
    mainPage.className = '';
}

/**
 * Função utilizada aceder ao fórum do site.
 * @function showForum
 */
function showForum(){
    window.location = "/forum";
}

/**
 * Função utilizada aceder ao login do site.
 * @function showLogin
 */
function showLogin(){
    window.location = "/login";
}

/**
 * Função utilizada aceder à página de registo.
 * @function showRegisterPage
 */
function showRegisterPage(){
    window.location = "/register";
}

/**
 * Função utilizada para tratar do envio de mensagens de um utilizador para os criadores/developers do site.
 * @function handleMail
 */
function handleMail(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var alert = document.getElementById("alert");
    if(!name){
        alert.textContent = "Invalid name";
        alert.style.color = "red";
        alert.style.textAlign = "center";
    }else if(!email){
        alert.textContent = "Invalid email";
        alert.style.color = "red";
        alert.style.textAlign = "center";
    }else if(!message){
        alert.textContent = "Invalid mesage";
        alert.style.color = "red";
        alert.style.textAlign = "center";
    }else{
        var mailOptions = {
            from: 'sustainabilitywebpi@gmail.com',
            to: '180221017@estudantes.ips.pt, 180221019@estudantes.ips.pt',
            subject: 'Message from '+ name,
            text: message + '\n\n\nContact: ' + email
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        console.log('Estou aqui');
        xhr.open('POST', '/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(JSON.stringify(mailOptions));
        xhr.send(JSON.stringify(mailOptions));

        alert.textContent = "Email sent successfully!";
        alert.style.color = "green";
        alert.style.textAlign = "center";

        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('message').value = "";
    }   
}

/**
 * Função utilizada mostrar a página de criação de um novo post ou thread
 * @function showAddThread
 */
function showAddThread(){
     document.getElementById("createThread").style.display = "block";
     document.getElementById("forum").style.display = "none"
}

/**
 * Função utilizada mostrar todos os threads/posts que existem de momento
 * @function showThreadsDiv
 */
function showThreadsDiv(){
    document.getElementById("createThread").style.display = "none";
    document.getElementsByClassName("introduction_f")[0].style.display = "none";
    document.getElementById("forum").style.display = "block";
    document.getElementById("reply_thread").style.display = "none";
}

/**
 * Função utilizada mostrar os comentários ou replies de um certo post/thread
 * @function showReplies
 */
function showReplies(){
    document.getElementById("createThread").style.display = "none";
    document.getElementsByClassName("introduction_f")[0].style.display = "none";
    document.getElementById("forum").style.display = "none";
    document.getElementById("reply_thread").style.display = "block";
}

