# Casting Agency

The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. This is a full stack web system to simplify and streamline the process.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

#### Database Setup

- `brew install postgres`
- `createdb casting_agency_db`
- `export DATABASE_URL="postgres://{username}@localhost:5432/casting_agency_db"`
-  `cd app/backend`
- `flask db upgrade`

#### Get Auth0 Credentials

1. Create a __Single Page Web Application__
2. Select __Settings__ tab, 
    - Update **Allowed Callback URLs** and **Allowed Logout URLs**
    - Copy down **Domain**, **Client ID**, **Domain**, **Client Secret**
        > backend/env.sh
        > export AUTH0_DOMAIN=**Domain With https**
        > export AUTH0_DOMAIN_I=**Domain**
        > export AUTH0_CLIENT_ID=**Client ID**
        > export AUTH0_CLENT_SECRET=**Client Secret**
        > export AUTH0_ALGORITHM="RS256"

        > frontend/ca-frontend-app/src/contexts/auth_config.json
        > {
        >   "domain": **Domain**,
        >   "clientId": **Client ID**
        > }
3. Create an API
4. Select __Settings__ tab,
    - Enable **RBAC** and **Add Permissions in the Access Token**
    - Copy down **Identifier**
        > backend/env.sh
        > export AUTH0_AUDIENCE=**Identifier**

        > frontend/ca-frontend-app/src/contexts/auth_config.json
        > {
        >   "audience": **Identifier**
        > }
5. Select __Permissions__ tab, add the following permissions
        1. `post:movies`
        2. `post:actors`
        3. `delete:movies`
        4. `delete:actors`
        5. `patch:movies`
        6. `patch:actors`
        7. `get:movies`
        8. `get:actors`
6. Create the following roles with corresponding permissions
    - **Casting Assistant**: `get:movies`,`get:actors`
    - **Casting Director**: (all permissions except `post:movies` and `delete:movies`)
    - **Executive Producer**: (all permissions)

     
### Installing

A step by step series of examples that tell you how to get a development env running

#### Backend

```shell
$ cd app/backend
$ virtualenv --no-site-packages env
$ source env/bin/activate
$ pip install -r requirements.txt
$ source .env.sh
$ python app.py
```

#### Frontend

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Flask](https://flask.palletsprojects.com/en/1.1.x/): A lightweight WSGI web application framework
* [SQLAlchemy](https://en.wikipedia.org/wiki/SQLAlchemy): The Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL
* [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance
* [Auth0](https://auth0.com/): A flexible, drop-in solution to add authentication and authorization services to applications
* [Flask-Migrate](https://github.com/miguelgrinberg/Flask-Migrate): An extension that handles SQLAlchemy database migrations for Flask applications using Alembic
* [Flask-Cors](https://flask-cors.readthedocs.io/en/latest/): A Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible. 
* [React](https://reactjs.org/): A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/): An open-source JavaScript library for managing application state
* [Material UI](https://material-ui.com/): A popular React UI framework
* [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js

## API Reference

See []() for documentation of API behavior and RBAC controls

## Authors

* **Beijia(Frances) Yu** - *Initial work*

