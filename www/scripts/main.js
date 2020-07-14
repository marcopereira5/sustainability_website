'use strict';


function main(){
    this.users = info.getUsers();
}

function getUsersInfo(){
    return this.users;
}

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global 'info' com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    const info = new Information();
    info.importUsers();
    info.importThreads();
    info.getUser();
    window.info = info;
};