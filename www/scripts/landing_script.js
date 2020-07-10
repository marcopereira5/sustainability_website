var introduction = document.querySelector('.introduction')
var mainPage = document.querySelector('.mainpage')
var menu = document.querySelector('.menu')
var tech_img = document.querySelector('#tech_img')
var toggle = document.querySelector('.labelResponsive')


var t1 = new TimelineMax();

t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
.fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function showDefinition(){

    var definition = document.getElementsByClassName('definition')[0];
    definition.style.display = 'block';
    var quote = document.querySelector('.quote');
    mainPage.onscroll = function(){};

    t1.fromTo(definition, 1, {opacity: "0"}, {opacity: "1"});

    introduction.style.display = 'none';

    mainPage.className = '';
}

function showMainPage(){
    window.scrollTo(0,0);

    var definition = document.getElementsByClassName('definition')[0];
    definition.style.display = 'none';

    introduction.style.display = 'block';

    mainPage.className = 'mainpage';

    t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
    .fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");
}

function showRegisterPage(){

}

