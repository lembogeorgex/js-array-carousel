// INIZIO dati ricevuti
const items = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg'
];
const title = [
    'Svezia',
    'Svizzera',
    'Gran Bretagna',
    'Germania',
    'Paradise'
]
const text = [
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
    'Lorem ipsum',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    'Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
]
let startIndex = 1;
// FINE dati ricevuti
const body = document.querySelector('body'); //seleziono body
// creo div.container
const container = document.createElement('div');
container.classList.add('container','d-flex');
// BODY > CONTAINER
body.prepend(container);
// creo div.main-img-container
const mainImgContainer = document.createElement('div');
mainImgContainer.classList.add('main-img-container','d-flex');
// CONTAINER > MAIN-IMG-CONTAINER
container.append(mainImgContainer);
// MAIN-IMG-CONTAINER > IMG
mainImgContainer.innerHTML = `<div id='div-image'><img class='img--${startIndex}' src = ${items[startIndex]} alt=''><div>`;
// creo div.text-div
const textDiv = document.createElement('div');
textDiv.classList.add('text-div','d-flex');
// creo span.title
const span = document.createElement('span');
span.classList.add('title')
span.innerHTML = title[startIndex];
// creo paragrafo
const p = document.createElement('p');
p.innerHTML = text[startIndex];
// MAIN-IMG-CONTAINER > TEXT-DIV
mainImgContainer.append(textDiv);
/*  TEXT-DIV > SPAN,
    TEXT-DIV > P*/
textDiv.append(span,p);
// creo div.container-thumbails
const thumbnailsMenu = document.createElement('div');
thumbnailsMenu.classList.add('thumbnails-menu','d-flex');
// CONTAINER > THUMBANAILS-MENU
container.append(thumbnailsMenu);
//scorro la lista (items.lenght = qualsiasi lista assegnata.lenght ... necessita controllo in caso di usi futuri)
//lunghezza in caso di aggiunta/rimozione img future
let thItemLen = 100/items.length;
// console.log(thItemLen);
for(let i = 0; i<items.length;i++) {
    // Creo div.thumbnails-item
    const thumbnailsItem = document.createElement('img');
    thumbnailsItem.classList.add('thumbnails-item');
    thumbnailsItem.style.height = `${thItemLen}%`;
    if(i == startIndex) {
        thumbnailsItem.classList.add('active');
    }
    if(i == 0) {
        thumbnailsItem.classList.add('first');
    } else if(i == items.length-1) {
        thumbnailsItem.classList.add('last');
    }
    //associo src immagine a seconda dell'indice
    thumbnailsItem.src=items[i];
    thumbnailsMenu.innerHTML += thumbnailsItem.outerHTML;
}
// Creazione div.arrow-up
const arrowUp = document.createElement('div');
arrowUp.classList.add('arrow-up');
arrowUp.innerHTML = '<i class="fas fa-chevron-up"></i>';
// Creazione div.arrow-down
const arrowDown = document.createElement('div');
arrowDown.classList.add('arrow-down');
arrowDown.innerHTML = '<i class="fas fa-chevron-down"></i>';
/* THUMBNAILS > ARROW-UP
THUMBNAILS > ARROW-DOWN
*/
thumbnailsMenu.append(arrowUp,arrowDown);
const first = document.querySelector('.thumbnails-item.first');
const last = document.querySelector('.thumbnails-item.last');
// click su arrow up
arrowUp.addEventListener('click',function(){
    let newClassValue = items.length-1;
    const divImage = document.getElementById('div-image');
    const actualImage = document.querySelector('.main-img-container img');
    //trova classe img--${valore} 
    for(let i = 0; i < actualImage.classList.length;i++) {
        //valore dopo class='img--
        const imageClassValue = parseInt(actualImage.classList[i].slice(5, actualImage.classList[i].length));
        let actualThumb = document.querySelector('.thumbnails-item.active');
        //diminuisco valore... quando = 0 vado a items.length
        if(imageClassValue >= 0) { 
            actualThumb.classList.remove('active');
            let previous = (actualThumb.previousElementSibling);
            if(previous === null) {
                divImage.innerHTML = `<img class='img--${newClassValue}' src = ${items[newClassValue]} alt=''>`;
                actualThumb = last;
                actualThumb.classList.add('active');
            } else {//diminuisco valore indice
                newClassValue = imageClassValue - 1;
                // console.log(newClassValue);
                previous.classList.add('active');
            }
        }
        // stampa nuova immagine e testo
        divImage.innerHTML = `<img class='img--${newClassValue}' src = ${items[newClassValue]} alt=''>`;
        span.innerHTML = title[newClassValue];
        p.innerHTML = text[newClassValue];
    }
});
// click su arrow down
arrowDown.addEventListener('click',function() {
    let newClassValue = 0;
    const divImage = document.getElementById('div-image');
    const actualImage = document.querySelector('.main-img-container img');
    //trova classe img--${valore} 
    for (let i = 0; i < actualImage.classList.length; i++) {
        //valore dopo class='img--
        const imageClassValue = parseInt(actualImage.classList[i].slice(5, actualImage.classList[i].length));
        let actualThumb = document.querySelector('.thumbnails-item.active');
        //diminuisco valore... quando = 0 vado a items.length
        if (imageClassValue >= 0) {
            actualThumb.classList.remove('active');
            let next = (actualThumb.nextElementSibling);
            if (next === null || next.classList.contains('arrow-up')) {
                divImage.innerHTML = `<img class='img--${newClassValue}' src = ${items[newClassValue]} alt=''>`;
                actualThumb = first;
                actualThumb.classList.add('active');
            } else {//incremento valore indice
                newClassValue = imageClassValue + 1;
                // console.log(newClassValue);
                next.classList.add('active');
            }
        }
        // stampa nuova immagine e testo
        divImage.innerHTML = `<img class='img--${newClassValue}' src = ${items[newClassValue]} alt=''>`;
        span.innerHTML = title[newClassValue];
        p.innerHTML = text[newClassValue];
    }
});