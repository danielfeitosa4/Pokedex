
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const RegExName = /\s/g  //RegEx for ignoring whitespaces on input
const input = document.querySelector('.input__search');
const type1 = document.querySelector('.type1')
const type2 = document.querySelector('.type2')
const icon1 = document.querySelector('.icon1')
const icon2 = document.querySelector('.icon2')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'block';
  icon1.className = "icon1";
  icon2.className = "icon2";
  console.clear()
  const imune = ["imune"]
  const strong025x = ["strong025x"]
  const strong05x = ["strong05x"]
  const normal1x = ["normal1x"]
  const weak2x = ["weak2x"]
  const weak4x = ["weak4x"]

//////////// remove img divs for weakness types /////////////////
  function typeConst(ConstType){
  const myNode = document.getElementById(ConstType);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}

  typeConst(imune)
  typeConst(strong025x)
  typeConst(strong05x)
  typeConst(normal1x)
  typeConst(weak2x)
  typeConst(weak4x)

const data = await fetchPokemon(pokemon);
  
  if (data) {
    searchPokemon = data.id;
    if (data.id < 650){
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    else {
      //add static pictures while i`m searching for gifs api
      pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
    }
    type1Name = data["types"][0]["type"]["name"]
    type1.src = "./images/typesImg/"+type1Name+".svg"
    icon1.className += ` ${type1Name}`;
    if(data["types"][1]){
      type2.style.visibility = "visible";
      type2Name = data["types"][1]["type"]["name"]
      type2.src = "./images/typesImg/"+type2Name+".svg"
      icon2.className += ` ${type2Name}`;
    }
    else{
      type2.style.visibility = "hidden";
    }
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

  ////////////// TYPE WEAKNESS    OBJECT IN pokePARSE.js///////////////////////
    for(let i=33; i < 51; i++){
    if(pokemonData[searchPokemon][i] == "0"){
        imune.push(pokemonData[0][i].slice(8,)) 
      }
		else if(pokemonData[searchPokemon][i] == "0.25"){
			strong025x.push(pokemonData[0][i].slice(8,)) 
		}
		else if(pokemonData[searchPokemon][i] == "0.5"){
			strong05x.push(pokemonData[0][i].slice(8,)) 
		}
		else if(pokemonData[searchPokemon][i] == "1"){
			normal1x.push(pokemonData[0][i].slice(8,)) 
		}
		else if(pokemonData[searchPokemon][i] == "2"){
			weak2x.push(pokemonData[0][i].slice(8,)) 
		}
		else if(pokemonData[searchPokemon][i] == "4"){
			weak4x.push(pokemonData[0][i].slice(8,)) 
		}
  
  
	}
////////////////puts img files in html ///////////////
  function imgWeakness(arr){
    const weaknessString = document.getElementById(arr[0])
    const weaknessClass = document.getElementById("span"+arr[0]);
    if (arr.length > 1 ){
      weaknessClass.style.visibility = "visible";
      weaknessClass.style.position = "static";
    for(let i=1; i<arr.length; i++){
      weaknessString.style.visibility = "visible";
      weaknessString.style.position = "static";
       const img = document.createElement("img")
        img.src="./images/typesImg/"+arr[i]+".svg"
        img.className = (arr[i])
        img.classList.add("typeWeakness")
      const weakness=  weaknessString
      weakness.appendChild(img)
  
    }
     
    }
    else{
      weaknessClass.style.visibility = "hidden";
      weaknessClass.style.position = "absolute";
      weaknessString.style.visibility = "hidden";
      weaknessString.style.position = "absolute";


    }
  }
  console.log(pokemonData[searchPokemon][2])

  imgWeakness(imune)
  imgWeakness(strong025x) 
  imgWeakness(strong05x) 
  imgWeakness(normal1x)
  imgWeakness(weak2x) 
  imgWeakness(weak4x) 


  } else {
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  
  renderPokemon(input.value.toLowerCase().replace(RegExName, ''));  // IGNORE WHITESPACES

  input.value = '';
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);