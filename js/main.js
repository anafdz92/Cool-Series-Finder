"use strict";

//Creamos dúas variables valeiras.

let series = [];
let favourites = [];

// 1.OBTER DATOS DA API

//1.1Creamos a referencia o botón

const buttonSearch = document.querySelector(".js-search-button");

//1.2Función para coller os datos da Api

const getDataFromApi = () => {
  //1.3 Creamos unha referencia o valor do imput
  const serieName = document.querySelector(".js-search__text");

  fetch(`http://api.tvmaze.com/search/shows?q=:${serieName.value}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      console.log(series);
      paintSeries();
    });
};

//1.4 Engadir eventListener o botón

buttonSearch.addEventListener("click", getDataFromApi);

//2. CREAMOS UNHA FUNCIÓN PARA PINTAR

const paintSeries = () => {
  let firstListCodeHTML = "";
  let secondListCodeHTML = "";
  let imgSerie;
  let favClass;

  //Se non hai series favoritas borramos "Mis series favoritas" e o reset
  showFavContainer();

  //BULCE ARRAY SERIES

  //Percorremos o array, se non ten imaxe poñemos a de Gremlins
  for (let index = 0; index < series.length; index += 1) {
    if (!series[index].show.image) {
      imgSerie = `./images/gremlins.jpg`;
    } else {
      imgSerie = series[index].show.image.medium;
    }
    //CONDICIONAL PARA QUE SE POÑA VERDE SE ESTÁ NO ARRAY DE FAVORITOS.
    //Necesitaría engadir favClass no HMTL indentado coma clase ${favClass} pero devolve "undefined".

    // for (let index = 0; index < favourites.length; index += 1) {
    //   if (favourites[index].show.id === series[index].show.id) {
    //     favClass = `js__serieStyle`; //undefined
    //   } else {
    //     favClass = `js__serieStyleFavourite`;
    //   }
    // }

    firstListCodeHTML += `<li id = "${series[index].show.id}" class = "js__serieStyle">`;
    firstListCodeHTML += `<article>`;
    firstListCodeHTML += `<img src= "${imgSerie}" class ="card__img" alt="Foto de ${series[index].show.name}"/> `;
    firstListCodeHTML += `<p> ${series[index].show.name}</p>`;
    firstListCodeHTML += `</article>`;
    firstListCodeHTML += `</li>`;
  }

  // BUCLE ARRAY SERIES FAVORITAS

  let imgfavourite;

  for (let index = 0; index < favourites.length; index += 1) {
    if (!favourites[index].show.image) {
      imgfavourite = `./images/gremlins.jpg`;
    } else {
      imgfavourite = favourites[index].show.image.medium;
    }
    secondListCodeHTML += `<li id = "${favourites[index].show.id}" class = "js__serieStyleFavourite">`;
    secondListCodeHTML += `<article>`;
    secondListCodeHTML += `<img src= "${imgfavourite}" class ="card__img" alt="Foto de ${favourites[index].show.name}"/> `;
    secondListCodeHTML += `<p> ${favourites[index].show.name}</p>`;
    secondListCodeHTML += `<label for="checkfavouriteSeries">`;
    secondListCodeHTML += `<input id="" type="radio" class="checkfavouriteSerie" value = "" name ="favouriteOptions" />`;
    secondListCodeHTML += `</label>`;
    secondListCodeHTML += `</article>`;
    secondListCodeHTML += `</li>`;
  }
  const favouriteList = document.querySelector(".js__favouriteList");
  favouriteList.innerHTML = secondListCodeHTML;

  const cartSeries = document.querySelector(".js__elements");
  cartSeries.innerHTML = firstListCodeHTML;

  listenSeries();
  listenReset();
  //listenFavourites();
};

function showFavContainer() {
  if (favourites.length > 0) {
    debugger;
    const titleFav = document.querySelector(`.title`);
    titleFav.classList.remove(`hidden`);
    const ResetBtn = document.querySelector(`.resetBtn`);
    ResetBtn.classList.remove(`hidden`);
  }
}

//3. SELECCIONAR FAVORITA.

function listenSeries() {
  let selectSeries = document.querySelectorAll(".js__serieStyle");
  console.log(selectSeries);

  for (const serie of selectSeries) {
    serie.addEventListener("click", changeFavourite);
  }
}

//VERSION CHANGE FAVOURITE SIMPLE
function changeFavourite(ev) {
  let clickedSerie = parseInt(ev.currentTarget.id);
  for (let i = 0; i < series.length; i++) {
    console.log("hola", clickedSerie, series[i].show.id);
    if (clickedSerie === series[i].show.id) {
      favourites.push(series[i]);
      //series[i].classList.add(".js__serieStyleFavourite"); //cambiar a verde?
    }
    updateLocalStorage();
  }

  paintSeries();
}

//VERSIÓN CHANGE FAVOURITE PRA ENGADIR/QUITAR DE FAVORITOS
//Si favoritos no contiene la serie clickada: métela si la contiene sacala
// function changeFavourite(ev) {
//   let clickedSerie = parseInt(ev.currentTarget.id);
//   for (let i = 0; i < favourites.length; i++) {
//     if (!favourites[i].show.id === clickedSerie) {
//       let clickedSerie = parseInt(ev.currentTarget.id);
//       for (let i = 0; i < series.length; i++) {
//         console.log("hola", clickedSerie, series[i].show.id);
//         if (clickedSerie === series[i].show.id) {
//           //series[i].classList.add(".js__serieStyleFavourite"); y pintala de verde
//           favourites.push(series[i]);
//         }
//       }
//     } else {
//       let clickedSerie = parseInt(ev.currentTarget.id);
//       for (let i = 0; i < series.length; i++) {
//         console.log("hola", clickedSerie, series[i].show.id);
//         if (clickedSerie === series[i].show.id) {
//           //series[i].classList.add("js__serieStyle"); y pintala de lila
//           favourites.splice([i], 1);
//         }
//       }
//     }
//     updateLocalStorage();
//   }
//   paintSeries();
// }

//4.LOCAL STORAGE

const updateLocalStorage = () => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

// const removeFromLocalStorage = () => {
//   localStorage.removeItem("favourites", JSON.stringify(favourites));
// };

const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("favourites"));
  if (data !== null) {
    favourites = data;
  }
};

//5.O FACER CLICK NA "X" O ELEMENTO DESAPARECE DO LOCALSTORAGE E DA LISTA

//Devolve que selectCheckBox is not a function

//seleccionar imput

// function listenFavourites() {
//   let selectCheckBox = document.querySelectorAll(".checkfavouriteSerie");
//   for (let i = 0; i < favourites.length; i++) {
//     selectCheckBox.addEventListener("click", removeFavourite);
//   }
// }

// function removeFavourite(ev) {
//   let clickedCheckBox = parseInt(ev.currentTarget.id);
//   for (let i = 0; i < favourites.length; i++) {
//     if (clickedCheckBox === favourites[i].show.id) {
//       favourites.splice([i], 1);
//       localStorage.removeItem("favourites[i]", JSON.stringify(favourites[i]));
//
//     }
//     updateLocalStorage();
//   }
//   paintSeries();
// }

// RESET FAVOURITES

function listenReset() {
  //Seleccionamos o Botón
  const btnReset = document.querySelector(".btnReset");
  // Escoitamos
  btnReset.addEventListener("click", resetAll);
}

function resetAll() {
  favourites.length = 0;
  window.localStorage.clear();
  paintSeries();
  //reset y el título desaparecen?
}

getFromLocalStorage();
paintSeries();
