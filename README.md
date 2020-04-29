# GH-Proyecto1-Netflix-Backend 🎞

BackEnd del primer proyecto del Bootcamp FullStack de GeeksHubs de una web de alquiler de peliculas.
Express / Sequelize
## Table of Content

- [Built With](##-Built-With)
- [Knowledge](##-Knowledge)
- [Getting Started](##-Getting-Started)
- [Partes API](##-Partes-API)
- [Ejemplo practico filtro](##-Ejemplo-practico-filtro)
- [Documentation](##-Documentation)
- [Author](##-Author)
- [Base de Datos](##-Base-de-Datos)


## Built With 🛠️

* Javascript
* Node
* Express
* SQL
* Sequelite
* GIT

Otros
* Postman
* XAMPP
* Trello


## Knowledge 🧠 

* Llamadas SQL
* Estructura Express


## Getting Started 🚀 

### Clonando repositorio

```js
git clone https://github.com/FerrowRafael/GeeksHubs_P4_-_MovieBackEnd.git
```


### Instalación dependencias

- Express
- Morgan
- Sequelize / Seguelize-cli
- mysql2
- Nodemon
- Axios
- Bcryptjs
- Jsonwebtoken
- moment


### Comenzando proyecto Express

Utilizamos express-generator para que nos genere una estructura de proyecto a partir de la cual trabajar.

```js
npm install express-generator -g

express --view=pug myapp

cd myapp

npm install

DEBUG=myapp:* npm start
```


### Configuración Sequelize-CLI

Instalación de dependencia
```js
$ npm install --save-dev sequelize-cli
```

Creando modelo 
```js
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

Migrando modelos a DB
```js
npx sequelize-cli db:migrate
```

Creando semilla
```js
npx sequelize-cli seed:generate --name demo-user
```

Migrando semilla a DB
```js
npx sequelize-cli db:seed:all
```


### Arrancar el servidor

Para arrancar el servidor tienes que introducir el comando:

```js
npm start
```

## Partes API 🗄 #Partes-API

- Configuration file
- Controllers
- Middleware
- Migrations
- Models
- Routes
- Seeders
  
### Configuration file

Este es el archivo de configuración de nuestra API

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "OldNetflix",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 1
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```

### Controllers

Los controladores tienen la lógica necesaria para obtener la información de la Base de Datos
Mis controladores son: 

#### Actor
#### City
#### Genre
#### Movie
#### Order
#### Search
#### User

Ejemplo: controllers/MovieController.js 
```js
MoviesById(req, res){
        let { id } = req.params;
        Movie.findAll({
            where: { id },
            include: [Genre, Actors],
            attributes: { exclude: ['createdAt', 'updatedAt'] },   
        })
            
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },
```


### Middleware

- Authentication


### Migrations

En las migraciones se almacena la estructura de cada tabla de la Base de Datos 
Ejemplo: migrations/++-create-cines.js


### Models

En los modelos se coloca el tipo de datos que tendran los valores de cada tabla de la Base de Datos y las relaciones con el resto de tablas.
Mis modelos son:

- Actor 
- City
- Genre
- Index
- Movie
- Movie_actor
- Movie_genre
- Order
- Token
- User

Ej. models/movie.js
```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    popularity: DataTypes.INTEGER,
    vote_count: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    original_language: DataTypes.STRING,
    original_title: DataTypes.STRING,
    title: DataTypes.STRING,
    vote_average: DataTypes.DECIMAL,
    overview: DataTypes.STRING,
    release_date: DataTypes.DATE
  }, {});
  Movie.associate = function(models) {
    Movie.hasMany(models.Order),
    Movie.belongsToMany(models.Genre, {
      through: models.MovieGenre,
    }),
    Movie.belongsToMany(models.Actors, {
      through: models.MovieActor,
    })
  };
  return Movie;
};
```


### Routes

#### Actor

GET <a href="http://localhost:3000/actors">http://localhost:3000/actors<a>
GET <a href="http://localhost:3000/actors/id=:id">http://localhost:3000/actors/id=:id<a>
GET <a href="http://localhost:3000/actors/name=:name">http://localhost:3000/actors/name=:name<a>
  
  
#### City

GET <a href="http://localhost:3000/cities">http://localhost:3000/cities<a>
GET <a href="http://localhost:3000/cities/user">http://localhost:3000/cities/user<a>
GET <a href="http://localhost:3000/cities/name=:name">http://localhost:3000/cities/name=:name<a>


#### Genre

GET <a href="http://localhost:3000/genres">http://localhost:3000/genres<a>
GET <a href="http://localhost:3000/genres/id=:id">http://localhost:3000/genres/id=:id<a>
GET <a href="http://localhost:3000/genres/name=:name">http://localhost:3000/genres/name=:name<a>


#### Movie

GET <a href="http://localhost:3000/movies">http://localhost:3000/movies<a>
GET <a href="http://localhost:3000/movies/id=:id">http://localhost:3000/movies/id=:id<a>
GET <a href="http://localhost:3000/movies/title=:title">http://localhost:3000/movies/title=:title<a>
GET <a href="http://localhost:3000/movies/popular">http://localhost:3000/movies/popular<a>
GET <a href="http://localhost:3000/movies/popular/genre=:name">http://localhost:3000/movies/popular/genre=:name<a>
GET <a href="http://localhost:3000/movies/premiere">http://localhost:3000/movies/premiere<a>
GET <a href="http://localhost:3000/movies/premiere/genre=:name">http://localhost:3000/movies/premiere/genre=:name<a>
POST <a href="http://localhost:3000/movies/">http://localhost:3000/movies/<a>
PUT <a href="http://localhost:3000/movies/id=:id">http://localhost:3000/movies/id=:id<a>
DELETE <a href="http://localhost:3000/movies/id=:id">http://localhost:3000/movies/id=:id<a>


#### Order

GET <a href="http://localhost:3000/orders/info/all">http://localhost:3000/orders/info/all<a>
POST <a href="http://localhost:3000/orders/order">http://localhost:3000/orders/order<a>
PUT <a href="http://localhost:3000/orders/order/id=:id">http://localhost:3000/orders/order/id=:id<a>
DELETE <a href="http://localhost:3000/orders/order/id=:id">http://localhost:3000/orders/order/id=:id<a>
GET <a href="http://localhost:3000/orders/order/id=:id">http://localhost:3000/orders/order/id=:id<a>
GET <a href="http://localhost:3000/orders/order/user=:id">http://localhost:3000/orders/order/user=:id<a>
GET <a href="http://localhost:3000/orders/user">http://localhost:3000/orders/user<a>


#### Search

GET <a href="http://localhost:3000/search/order/dateR=:dateRent">http://localhost:3000/users/order/dateR=:dateRent<a>
GET <a href="http://localhost:3000/search/order/dateA=:dateArrival">http://localhost:3000/users/order/dateA=:dateArrival<a>
GET <a href="http://localhost:3000/search/order/movie=:title">http://localhost:3000/users/order/movie=:title<a>


#### Users

POST <a href="http://localhost:3000/users/register">http://localhost:3000/users/register<a>
POST <a href="http://localhost:3000/users/login">http://localhost:3000/users/login<a>
GET <a href="http://localhost:3000/users/logout">http://localhost:3000/users/logout<a>
GET <a href="http://localhost:3000/users/info">http://localhost:3000/users/info<a>
PUT <a href="http://localhost:3000/users/update">http://localhost:3000/users/update<a>
DELETE <a href="http://localhost:3000/users/delete/id=:id">http://localhost:3000/users/delete/id=:id<a>
GET <a href="http://localhost:3000/users/info/all">http://localhost:3000/users/info/all<a>
GET <a href="http://localhost:3000/users/info/id=:id">http://localhost:3000/users/info/id=:id<a>
GET <a href="http://localhost:3000/users/info/username=:username">http://localhost:3000/users/info/username=:username<a>
GET <a href="http://localhost:3000/users/order/">http://localhost:3000/users/order/<a>
GET <a href="http://localhost:3000/users/order/email=:email">http://localhost:3000/users/order/email=:email<a>
GET <a href="http://localhost:3000/users/order/orderDate=:id">http://localhost:3000/users/order/orderDate=:id<a>
GET <a href="http://localhost:3000/users/order/id=:id">http://localhost:3000/users/order/id=:id<a>
  

### Seeders

- City
- Actors
- Genres
- Movie

Ej. seeders/Movie.js
```js
for (let page = 1; page < 21; page++) {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES&page=${page}`)
        .then(res => {
            const peliculas = res.data.results;
            for (const pelicula of peliculas) {
                Movie.create(pelicula)
                .then(movie=>{
                    movie.addGenre(pelicula.genre_ids)
                })
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
}
```

### Seeders

- Authorization
- Signature
- Validations


## Ejemplo practico filtro ⚙️

Si queremos buscar por ejemplo a un actor en particular y queremos saber también las peliculas en las que ha participado
Introducimos la ruta:
``` js
http://localhost:3000/actores/pelicula/Graciela
```

Obtendremos el siguiente JSON
```json
{
        "id": 603,
        "popularity": 50,
        "vote_count": 16643,
        "poster_path": "/ejmTPNAkgZaVJ4AI9zb9SehAYU0.jpg",
        "backdrop_path": "/oMsxZEvz9a708d49b6UdZK1KAo5.jpg",
        "original_language": "en",
        "original_title": "The Matrix",
        "title": "Matrix",
        "vote_average": "8",
        "overview": "Thomas Anderson lleva una doble vida: por el día es programador en una importante empresa de software, y por la noche un hacker informático llamado Neo. Su vida no volverá a ser igual cuando unos misteriosos personajes le inviten a descubrir la pregunta q",
        "release_date": "1999-03-30T00:00:00.000Z",
        "Genres": [
            {
                "id": 28,
                "name": "Acción",
                "createdAt": "2020-04-19T15:25:52.000Z",
                "updatedAt": "2020-04-19T15:25:52.000Z",
                "MovieGenre": {
                    "MovieId": 603,
                    "GenreId": 28,
                    "createdAt": "2020-04-19T15:26:12.000Z",
                    "updatedAt": "2020-04-19T15:26:12.000Z"
                }
            },
            {
                "id": 878,
                "name": "Ciencia ficción",
                "createdAt": "2020-04-19T15:25:52.000Z",
                "updatedAt": "2020-04-19T15:25:52.000Z",
                "MovieGenre": {
                    "MovieId": 603,
                    "GenreId": 878,
                    "createdAt": "2020-04-19T15:26:12.000Z",
                    "updatedAt": "2020-04-19T15:26:12.000Z"
                }
            }
        ],
        "Actors": [
            {
                "id": 6384,
                "name": "Keanu Reeves",
                "profile_path": "/bOlYWhVuOiU6azC4Bw6zlXZ5QTC.jpg",
                "createdAt": "2020-04-19T15:25:31.000Z",
                "updatedAt": "2020-04-19T15:25:31.000Z",
                "MovieActor": {
                    "MovieId": 603,
                    "ActorId": 6384,
                    "createdAt": "2020-04-19T15:25:32.000Z",
                    "updatedAt": "2020-04-19T15:25:32.000Z"
                }
            },
            {
                "id": 2975,
                "name": "Laurence Fishburne",
                "profile_path": "/7XP72qzAjbIFikZIpXroLbSS8Cy.jpg",
                "createdAt": "2020-04-19T15:25:31.000Z",
                "updatedAt": "2020-04-19T15:25:31.000Z",
                "MovieActor": {
                    "MovieId": 603,
                    "ActorId": 2975,
                    "createdAt": "2020-04-19T15:25:33.000Z",
                    "updatedAt": "2020-04-19T15:25:33.000Z"
                }
            }
        ]
    },
}
```

## Documentation 📚 

- [Express](https://expressjs.com/)
- [Seguelize CLI](https://sequelize.org/master/manual/migrations.html)
- [MomentJS](https://momentjs.com/)


## Author 👨🏼‍💻 

* **Rafael Fernández Gómez** - [FerrowRafael](https://github.com/FerrowRafael)
* **Daniel Vazquez Guerra** - [danielvazquezguerra](https://github.com/danielvazquezguerra)


## Base de Datos

<img src="./public/images/DB.jpg" title="DB-OldNetflix" alt="DB-OldNetflix"></a>
