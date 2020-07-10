'use strict';
/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global 'info' com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    const info = new Information();
    window.info = info;
    info.importUsers();
    console.log(info.getUsers());
};