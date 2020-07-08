const introduction = document.querySelector('.introduction')
const mainPage = document.querySelector('.mainpage')
const menu = document.querySelector('.menu')
const tech_img = document.querySelector('#tech_img')
const toggle = document.querySelector('.labelResponsive')


const t1 = new TimelineMax();

t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
.fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");

function showDefinition(){

    var definition = document.getElementsByClassName('definition')[0];
    definition.style.display = 'block';

    t1.fromTo(definition, 1, {opacity: "0"}, {height: "1"});

    introduction.style.display = 'none';

    mainPage.className = '';
}

function showMainPage(){

    var definition = document.getElementsByClassName('definition')[0];
    definition.style.display = 'none';

    introduction.style.display = 'block';

    mainPage.className = 'mainpage';

    t1.fromTo(mainPage, 1, {width: "0%"}, {width: "100%"}).fromTo(introduction, 1, {height: "200%"}, {height: "20%"})
.fromTo(menu, 1.5, {opacity: "0"}, {opacity: "1"}).fromTo(toggle, 1, {opacity: "0"}, {opacity: "1"}, "-=1.5");
}

