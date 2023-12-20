const pokedex = document.getElementById("pokedex");
const pokemonFilter = document.querySelectorAll(".nav-list-type button");

let allPokemons = []; // Array de todos los pokemon 1era generación a la 3era generación

// Función async para extraer los datos de la API
const pokemonData = async () => {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
  const totalPokemon = 386;

  for (let i = 1; i <= totalPokemon; i++) {
    const urlPokemon = `${pokeApi}${i}`;

    try {
      const response = await fetch(urlPokemon);
      const pokemonData = await response.json();
      console.log(pokemonData)
      
      // Almacena cada Pokémon en el array
      const pokemon = {
        name: pokemonData.name,
        image: pokemonData.sprites["front_default"],
        backImage: pokemonData.sprites["back_default"],
        description: pokemonData.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join("\n"),
        type: pokemonData.types.map((type) => type.type.name).join(", "),
        id: pokemonData.id,
      };
      allPokemons.push(pokemon);
      
      // Llama a la función de pintado para cada Pokémon
      pokemonPaint(pokemon);
    } catch (error) {
      console.error("Error de petición:", error);
    }
  }
};


// Función para pintar la tarjeta de cada Pokémon
const pokemonPaint = (pokemon) => {

    //creacion elementos y asignacion de clases y textContent
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    
    //front de la carta:
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const pokemonTitle = document.createElement("h2");
    pokemonTitle.textContent = pokemon.name;
    pokemonTitle.classList.add("card-title");
  
    const pokemonSubtitle = document.createElement("p");
    pokemonSubtitle.textContent = `Type: ${pokemon.type}`;
    pokemonSubtitle.classList.add("card-subtitle")
  
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add("card-image")

    const pokemonId = document.createElement("p");
    pokemonId.textContent = `#${pokemon.id}`;
    pokemonId.classList.add("card-id");

    //back de la carta

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const pokemonBackImage = document.createElement("img");
    pokemonBackImage.classList.add("card-backImage");
    pokemonBackImage.src = pokemon.backImage;
    pokemonBackImage.alt = pokemon.name;

    const pokemonDescription = document.createElement("p");
    pokemonDescription.textContent= `${pokemon.description}`;
    pokemonDescription.classList.add("card-description");

  
    // Agregar elementos al front y back de la tarjeta
    cardFront.appendChild(pokemonTitle);
    cardFront.appendChild(pokemonSubtitle);
    cardFront.appendChild(pokemonImage);
    cardFront.appendChild(pokemonId);
    cardBack.appendChild(pokemonDescription);
    cardBack.appendChild(pokemonBackImage);
  
    // Agrega front y back a la tarjeta y esta al contenedor principal
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);
    pokedex.appendChild(card);
  };
  

const pokemonFilterType = (type) => {
  // Filtración por tipo de Pokémon
  const filteredPokemon = allPokemons.filter((pokemon) =>
    pokemon.type.toLowerCase().includes(type.toLowerCase())
  );
  pokedex.innerHTML = ""; // Limpiamos el filtro
  filteredPokemon.forEach((pokemon) => pokemonPaint(pokemon));
};

// Evento de clic a los botones de filtrado de tipos
pokemonFilter.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "ver-todos") {
      resetPokemonList();
    } else {
      const type = button.id;
      pokemonFilterType(type);
    }
  });
});

const resetPokemonList = () => {
  pokedex.innerHTML = ""; // Limpiar el contenido actual
  allPokemons.forEach((pokemon) => pokemonPaint(pokemon)); // Volver a mostrar todos los Pokémon
};


// Creación y evento de Input que filtra pokemon por nombre
const pokemonSearch = document.getElementById("searchYourPokemon");
pokemonSearch.addEventListener("input", () => {
  const pokemonSearchValue = pokemonSearch.value.toLowerCase();
  const pokemonByName = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonSearchValue)
  );
  pokedex.innerHTML = ""; // Limpiar filtro
  pokemonByName.forEach((pokemon) => pokemonPaint(pokemon));
});

pokemonData();

