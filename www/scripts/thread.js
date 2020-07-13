"use strict";

/**
 * @class Estrutura capaz de armazenar o estado de uma entidade thread
 * @constructs Thread
 * @param {int} id - id da thread
 * @param {string} name - nome da thread
 * @param {Date} creationDate - data da thread
 * @param {User} user - ID do user creador da thread
 * @param {string} text - texto da thread~
 * @param {Replies[]} replies - respostas ao thread
 */
function Thread(id, name, creationDate, text, user, replies){
    this.id = id;
    this.creationDate = creationDate;
    this.user = user;
    this.text = text; 
    this.name = name;
    this.replies = replies;
}

function addReply(reply){
    this.replies.push(reply);
}