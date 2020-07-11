var introduction = document.querySelector('.introduction')
var mainPage = document.querySelector('.mainpage')
var about = document.querySelector('.about')
var menu = document.querySelector('.menu')
var tech_img = document.querySelector('#tech_img')
var toggle = document.querySelector('.labelResponsive')

var pages = document.getElementsByTagName('main');



var t1 = new TimelineMax();

t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
.fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");
startPage();
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}


function startPage(){
    for(var i = 0; i < pages.length; i++){
        if(pages[i].className != 'introduction'){
            pages[i].style.display = 'none'; 
        }
    }
}

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

function showRegisterPage(){

}

function handleMail(){
    var name = document.getElementById('name').nodeValue;
    var email = document.getElementById('email').nodeValue;
    var message = document.getElementById('message').nodeValue;

    var mailOptions = {
        from: 'sustainabilitywebpi@gmail.com',
        to: '180221017@estudantes.ips.pt, 180221017@estudantes.ips.pt',
        subject: 'Message from '+ name,
        text: message + '\nContact: ' + email
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            alert('Something went wrong. Please try again');
        }else{
            alert('Message sent successfully')
        }
    })
}
