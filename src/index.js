const express = require("express");
const app = express();
app.use(express.json());
//import apiPokemon from './services/api';

const axios = require("axios");

const trainers = [];
var seqTrainer = 0;

function validaBodyTrainers(body) {
  const { nickname, first_name, last_name, email, password, team } = body;

  if (!nickname) {
    return "nickname required";
  }

  if (!first_name) {
    return "first_name required";
  }

  if (!last_name) {
    return "last_name required";
  }

  if (!email) {
    return "email required";
  }

  if (!password) {
    return "password required";
  }

  if (!team) {
    return "team required";
  }
}

function validaBodyAuthenticate(body) {
  const { email, password } = body;

  if (!email) {
    return "email required";
  }

  if (!password) {
    return "password required";
  }
}

app.get("/trainers", (request, response) => {
  return response.send(trainers);
});

app.post("/trainers", (request, response) => {
  const error = validaBodyTrainers(request.body);

  if (error) {
    const errorMessage = {
      code: 0,
      type: "string",
      message: error,
    };

    return response.status(400).send(errorMessage);
  }

  //+
  //  request.body;
  const { nickname, first_name, last_name, email, password, team } = request.body;

  const trainer = {
    id: seqTrainer,
    nickname: nickname,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    team: team,
  };
  trainers.push(trainer);
  seqTrainer = seqTrainer + 1;
  return response.status(201).send(trainer);
});

app.post("/trainers/authenticate", (request, response) => {
  const error = validaBodyAuthenticate(request.body);

  if (error) {
    const errorMessage = {
      code: 0,
      type: "string",
      message: error,
    };

    return response.status(400).send(errorMessage);
  }

  const { email, password } = request.body;

  const trainerIndex = trainers.findIndex(
    (trainer) => trainer.email == email && trainer.password == password
  );

  if (trainerIndex < 0) {
    return response.status(403).json({ error: "incorrect email or password" });
  }

  return response.status(200).send(trainers[trainerIndex]);
  // return response.status(201).send(trainer);
});

app.get("/trainers/:id", (request, response) => {
  const { id } = request.params;
  const trainerIndex = trainers.findIndex((trainer) => trainer.id == id);

  if (trainerIndex < 0) {
    return response.status(400).json({ error: "Trainer not found" });
  }

  return response.send(trainers[trainerIndex]);
});

// add pokemon
app.post("/trainers/:id/pokemon", (request, response) => {
  const { id } = request.params;

  const { name, level, pokemon_id } = request.body;

  var pokemonData = "a";

  //apiPokemon.get('pokemon/'+ pokemon_id).then(reponse =>console.log(reponse));

  /*
  var options = {
    method: "GET",
    url: 'https://pokeapi.co/api/v2/pokemon/charizard/',
    //url: "https://pokeapi.co/api/v2/characteristic/12/",

    headers: { "Content-Type": "application/json" },
  };
*/

  var options = {
    method: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/" + name,
  };

  axios
    .request(options)
    .then(function (responses) {
      //console.log(response.data);
      pokemonData = responses.data;

      if (responses.data < 0) {
        return response.status(403).json({ error: "pokemon not found" });
      }

      const trainerIndex = trainers.findIndex((trainer) => trainer.id == id);

      if (trainerIndex < 0) {
        return response.status(403).json({ error: "trainer not found" });
      }

      var pokemons = [];

      if (trainers[trainerIndex].pokemons) {
        pokemons = trainers[trainerIndex].pokemons;
      }

      const pokemon = {
        name: name,
        level: level,
        pokemon_id: pokemon_id,
        pokemon_data: pokemonData,
      };

      pokemons.push(pokemon);

      const trainer = {
        id: trainers[trainerIndex].id,
        nickname: trainers[trainerIndex].nickname,
        first_name: trainers[trainerIndex].first_name,
        last_name: trainers[trainerIndex].last_name,
        email: trainers[trainerIndex].email,
        password: trainers[trainerIndex].password,
        team: trainers[trainerIndex].team,
        pokemons: pokemons,
      };

      trainers[trainerIndex] = trainer;

      return response.status(201).send(trainer);
    })
    .catch(function () {
 
      return response.status(400).send({ error: "pokemon not found" });
    });
});

 

app.delete("/trainers/:id/pokemon/:pokemonId", (request, response) => {
  const { id ,pokemonId } = request.params;

  const trainerIndex = trainers.findIndex((trainer) => trainer.id == id);

  if (trainerIndex < 0) {
    return response.status(400).json({ error: "Trainer not found" });
  }

const { nickname  
  , first_name 
  , last_name 
  , email 
  , password 
  , team
  , pokemons } = trainers[trainerIndex];

//  console.log(pokemons);

const pokemonIndex = trainers.findIndex((trainer) => trainer.id == id);

if (pokemonIndex < 0) {
  return response.status(400).json({ error: "pokemon not found" });
}

pokemons.splice(pokemonIndex,1);

const trainer = {
    id: seqTrainer,
    nickname: nickname,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    team: team,
    pokemons: pokemons
  };

  trainers[trainerIndex] = trainer;

  //trainers.splice(trainerIndex, 1);

  return response.status(204).send();
});




app.listen(3333, () => {
  console.log("Server Refresh.");
});
