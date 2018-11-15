let response;

let containerPokeMe = document.getElementById("containerPokeMe");
let responsePokeme = document.getElementById("responsePokeme");
let responsePokemeIMG = document.getElementById("responsePokemeIMG");
let pokeball = document.getElementById("pokeball");
let btnTryAgain = document.getElementById("tryAgain");
let btnTryAgainDex = document.getElementById("tryAgainDex");
let ContainerList = document.getElementById("cartas");

let containerPokedex = document.getElementById("containerPokedex");
let responsePokedex = document.getElementById("responsepokedex");
let responsePokedexIMG = document.getElementById("responsepokedexIMG");
let formPokedex = document.getElementById("formPokedex");
const FormPokeMe = document.getElementById('formPokeMe');
const FormPokedex = document.getElementById('formPokedex');

// dataReceived(): Este evento se dispara cuando el request
// obtiene sus datos de forma satisfactoria.
function obtenerDatos(event) {
  event.preventDefault();
  const age = event.target.elements[0].value;
  // Itera sobre los resultados y los agrega a la lista.
  //  response.cards[age].imageUrl;
  let pokeme = document.createElement('img');
  pokeme.setAttribute('src', response.cards[age].imageUrl);
  responsePokemeIMG.appendChild(pokeme);
  pokeball.setAttribute("class", "none");
  FormPokeMe.setAttribute("class", "none");
  btnTryAgain.removeAttribute ("class");

  let pokemeText = document.createElement('h3');
  pokemeText.innerText = 'Nombre: ' + response.cards[age].name;

  let pokemeNumber = document.createElement('p');
  pokemeNumber.innerText = 'Número en la pokedex: ' + response.cards[age].nationalPokedexNumber;

  let pokemeType = document.createElement('p');
  pokemeType.innerText = 'Tipo: ' + response.cards[age].supertype;

  responsePokeme.appendChild(pokemeText);
  responsePokeme.appendChild(pokemeNumber);
  responsePokeme.appendChild(pokemeType);
}
function obtenerDatosPokedex(event) {
  event.preventDefault();
  let contador = 0;
  const name = event.target.elements[0].value;
  // Itera sobre los resultados y los agrega a la lista.
  //  response.cards[age].imageUrl;

    for (const element of response.cards) {
    let pokedexText = document.createElement('h3');

    let elementlow = element.name.toLowerCase();
    let namelow = name.toLowerCase();
      if (namelow === elementlow) {
        let pokedeximg = document.createElement('img');
        pokedeximg.setAttribute('src', element.imageUrl);

        //datos de la carta
        let pokedexText = document.createElement('h3');
        pokedexText.innerText = 'Nombre: ' + element.name;

        let pokedexNumber = document.createElement('p');
        pokedexNumber.innerText = 'Número en la pokedex: ' + element.nationalPokedexNumber;

        let pokedexType = document.createElement('p');
        pokedexType.innerText = 'Tipo: ' + element.supertype;

        responsePokedex.appendChild(pokedexText);
        responsePokedex.appendChild(pokedexNumber);
        responsePokedex.appendChild(pokedexType);
        responsePokedex.appendChild(pokedeximg);
      } else {
        contador ++;
      }
      if (contador>99) {
        pokedexText.innerText = "No se ha encontrado una carta que coincida";
        responsePokedex.appendChild(pokedexText);
      }

  }
  formPokedex.setAttribute("class", "none");
  btnTryAgainDex.removeAttribute ("class");
}
function tryAgain() {
  location.reload(true);
}

// getElements(): Crea un nuevo request para solicitar los datos.
function getElements() {
  // Crea un nuevo XMLHttpRequest.
  const request = new XMLHttpRequest();
  // Define el tipo de respuesta esperada como 'json'.
  request.responseType = 'json';
  // Inicializa el request.
  request.open('GET', 'https://api.pokemontcg.io/v1/cards');
  // Envía el request.
  request.send();

  request.addEventListener('load', function (event) {
    // Obtiene la respuesta.
    response = event.target.response;
    for (cards of response.cards){
      let list = document.createElement('li');
      list.innerText = cards.name;
      list.setAttribute('class', "dexlist");
      ContainerList.appendChild(list);

    }
  });
}
getElements();


FormPokeMe.addEventListener('submit', obtenerDatos);
FormPokedex.addEventListener('submit', obtenerDatosPokedex);
btnTryAgain.addEventListener('click', tryAgain);
btnTryAgainDex.addEventListener('click', tryAgain);
