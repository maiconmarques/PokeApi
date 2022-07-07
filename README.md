# PokeApi

a primeira vez que a aplicação for utilizada será necessário instalar as dependências do yarn na pasta do projeto
yarn install
para subir o servidor é necessário executar o comando 
yarn dev

a aplicação foi feita salvando apenas na memória, sem a utilização de um banco de dados, servindo apenas de exemplo, por isso os dados inseridos são validos apenas enquanto o servidor estiver no ar

Exemplos de testes:

visualizar todos os treinadores GET http://localhost:3333/trainers/

consultar treinador por ID  GET http://localhost:3333/trainers/{trainerId}

adicionar treinador post http://localhost:3333/trainers/ 
body 
{ "nickname": "Ash" 
 , "first_name": "Ash" 
 , "last_name": "Ketshup"
 , "email": "ketshup@pokemail.com"
 , "password": "senha"
 , "team": "valor"}

autenticar treinador POST http://localhost:3333/trainers/authenticate 
{
  "emaisl": "ketshup@pokemail.com",
  "passwords": "senhas"
}
adiciona pokemon ao treinador POST http://localhost:3333/trainers/0/pokemon 
  {
		"name": "squirtle",
    "level": 4,
    "pokemon_id": 1
	}
Exclui pokemon DEL http://localhost:3333/trainers/0/pokemon/2

