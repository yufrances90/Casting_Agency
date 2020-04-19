## Error Codes & Error Messages

- **CAE0001**: Cannot delete actor or movie due to existing shows
- **CAE0002**: No actor is found for id
- **CAE0003**: No actor info is provided for creation or update
- **CAE0004**: No movie info is provided for creation or update
- **CAE0005**: No movie is found for id
- **CAE0006**: Existing show found
- **CAE0007**: No header is present
- **CAE0008**: The header is malformed
- **CAE0009**: Permissions are not included in the payload 
- **CAE0010**: Action is not authorized
- **CAE0011**: Token expired
- **CAE0012**: Incorrect claims. Please, check the audience and issuer
- **CAE0013**: Unable to parse authentication token
- **CAE0014**: Unable to find the appropriate key
- **CAE0015**: No cast team info is provided
- **CAE0016**: No request data is provided

---

## API Documentation

> All endpoints require Auth0 authentication

`GET` ```/actors```
- __permission__: `get:actors`
-  __response__: `{ success : True, actors : (actor list) }`

`POST` ```/actors```
- __permission__: `post:actors`
- __request__:
    - __data params__: `{ name, age, gender, image_link  }`
-  __response__: `{ success : True, actor : (newly created actor) }`

`DELETE` ```/actors/<int:actor_id>```
- __permission__: `delete:actors`
- __request__:
    - __url params__: `actor_Id`
-  __response__: `{ success : True, actorId : (the id of deleted actor) }`

`PATCH` ```/actors/<int:actor_id>```
- __permission__: `patch:actors`
- __request__:
    - __data params__: `{ name, age, gender, image_link  }`
    - __url params__: `actor_Id`
-  __response__: `{ success : True, actor : (updated actor) }`

`GET` ```/actors/<int:actor_id>```
- __permission__: `get:actors`
- __request__:
    - __url params__: `actor_Id`
-  __response__: `{ success : True, actor : (actor with given actor id) }`

`GET` ```/movies```
- __permission__: `get:movies`
-  __response__: `{ success : True, movies : (movie list) }`

`POST` ```/movies```
- __permission__: `post:movies`
- __request__:
    - __data params__: `{ title, release_date, image_link  }`
-  __response__: `{ success : True, movie : (newly created movie) }`

`DELETE` ```/movies/<int:movie_id>```
- __permission__: `delete:movies`
- __request__:
    - __url params__: `movie_id`
-  __response__: `{ success : True, movieId : (the id of deleted movie) }`

`PATCH` ```/movies/<int:movie_id>```
- __permission__: `patch:movies`
- __request__:
    - __data params__: `{ title, release_date, image_link  }`
    - __url params__: `movie_id`
-  __response__: `{ success : True, movie : (updated movie) }`

`GET` ```/movies/<int:movie_id>```
- __permission__: `get:movies`
- __request__:
    - __url params__: `movie_id`
-  __response__: `{ success : True, movie : (movie with given movie id) }`

`PUT` ```/movies/<int:movie_id>/actors```
- __permission__: `patch:movies`
- __request__:
    - __data params__: `{ actor_ids: (string of actor ids, joined by comma) }`
    - __url params__: `movie_id`
-  __response__: `{ success : True, movies : (movie list), actors: (actor list) }`
- `NOTE`: **This endpoint can be used to add, remove actors from cast team**
- __usage__: 
    - if actor 9 and 10 are in cast team:
        - actor_ids="9": actor 10 removed from cast team
        - actor_ids="8, 9": actor 10 removed from cast team and actor 8 added to cast team
        - actor_ids="": no actor is in cast team
        - actor_ids="8,9,10": actors 8, 9, 10 are in cast team