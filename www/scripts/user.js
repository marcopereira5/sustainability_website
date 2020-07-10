"use strict";

/**
 * @class Estrutura capaz de armazenar o estado de uma entidade user
 * @constructs User
 * @param {int} id - id da user
 * @param {string} name - nome do user
 * @param {string} email - email do user
 * @param {password} password - password do user
 */
function User(id, name, email, password){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; 
}