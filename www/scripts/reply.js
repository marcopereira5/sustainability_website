"use strict";

/**
 * @class Estrutura capaz de armazenar o estado de uma entidade thread
 * @constructs Reply
 * @param {int} id - id da thread
 * @param {Date} creationDate - data da thread
 * @param {User} user - ID do user creador da thread
 * @param {string} text - texto da thread
 */
function Reply(id, creationDate, text, user){
    this.id = id;
    this.creationDate = creationDate;
    this.text = text; 
    this.user = user;
}
