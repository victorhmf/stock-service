<div align="center">
    <img src="https://media.licdn.com/dms/image/D4E0BAQETyObSEmZH-A/company-logo_200_200/0/1693956448491/jobsity_llc_logo?e=1723075200&v=beta&t=rGq4fY1cprFyIaSabim0_bgb-QLCbJUk6Es9dXuua1w"/>
</div>

# Node.js Challenge

## Description

This project is designed to test your knowledge of back-end web technologies, specifically in Node.js, REST APIs, and decoupled services (microservices).

## Assignment

The goal of this exercise is to create a simple API with Node.js, using or not any framework of your choice, to allow users to query [stock quotes](https://www.investopedia.com/terms/s/stockquote.asp). It is scaffolded with two Express apps, but you can use another backend Node.js framework of your preference.

The project consists of two separate services:

* A user-facing API that will receive requests from registered users asking for quote information.
* An internal stock service that queries external APIs to retrieve the requested quote information.

## Minimum requirements
 - You will need to **record a video explaining the code** you created, the decisions you made, its functionality, and demonstrating the complete operation of the challenge. _Remember to show the execution from scratch, it should not be running beforehand._

### API service

* Endpoints in the API service should require authentication (no anonymous requests should be allowed). Each request should be authenticated via Basic Authentication.
  * To register a user the API service must receive a request with an email address, user role and return a randomized password, like this:

    Request example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "role": "user" }  //role could be user/admin
    ```

    Response example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "password": "bda5d07453dfde4440803cfcdec48d92" }
    ```
* When a user requests a stock quote (calls the stock endpoint in the api service), if it exists, it should be saved and related to that user in the database.
  * The response returned by the API service should be like this:

    `GET /stock?q=aapl.us`

    ```json
      {
      "name": "APPLE",
      "symbol": "AAPL.US",
      "open": 123.66,
      "high": 123.66,
      "low": 122.49,
      "close": 123
      }
    ```
  * A user can get their history of queries made to the api service by hitting the history endpoint. The endpoint should return the list of entries saved in the database, showing the latest entries first:

    `GET /history`

    ```javascript
    [
        {"date": "2021-04-01T19:20:30Z", "name": "APPLE", "symbol": "AAPL.US", "open": "123.66", "high": 123.66, "low": 122.49, "close": "123"},
        {"date": "2021-03-25T11:10:55Z", "name": "APPLE", "symbol": "AAPL.US", "open": "121.10", "high": 123.66, "low": 122, "close": "122"},
        ...
    ]
    ```
* A super user (and only super users) can hit the stats endpoint, which will return the top 5 most requested stocks:

  (This endpoint will validate the user's role)

  `GET /stats`

  ```json
  [
      {"stock": "aapl.us", "times_requested": 5},
      {"stock": "msft.us", "times_requested": 2},
      ...
  ]
  ```
* All endpoint responses should be in JSON format.

### Stock service

* Assume this is an internal service, so requests to endpoints in this service don't need to be authenticated.
* When a stock request is received, this service should query an external API to get the stock information. For this challenge, use this API: `https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcvn&h&e=csv`.
* Note that `{stock_code}` above is a parameter that should be replaced with the requested stock code.
* You can see a list of available stock codes here: [https://stooq.com/t/?i=518](https://stooq.com/t/?i=518)

## Architecture

![Architecture Diagram](https://git.jobsity.com/jobsity/node-challenge/-/blob/master/architecture.png)

1. A user makes a request asking for Nasdaq's current Stock quote: `GET /stock?q=ndq`
2. The API service calls the stock service to retrieve the requested stock information
3. The stock service delegates the call to the external API, parses the response and returns the information back to the API service.
4. The API service saves the response from the stock service in the database.
5. The data is formatted and returned to the user.

## Bonuses

The following features are optional to implement, but if you do, you'll be ranked higher in our evaluation process.

* Add unit tests for the services.
* Add contract/integration tests for the API service.
* Use JWT instead of basic authentication for endpoints.
* Use containers to orchestrate the services.
* Use OpenAPI/Swagger to document the API.
* Add endpoint to reset user password sending an email with the new password.

## How to run the project

#### Requirements

Ensure you have `docker` and `docker-compose` installed on your machine to run the project smoothly.

#### Setup

1. Build the images using: `docker-compose build`
2. Start the containers by running: `docker-compose up -d`
3. Monitor the logs with: `docker-compose logs -f`
4. Execute database migrations via: `docker exec -it api-service npm run db:migrate`
5. To shut down the application, simply run: `docker-compose down`

Upon completion of these steps, the services will be available at the following endpoints:

- api-service: `http://localhost:3001`
- stock-service: `http://localhost:3002`
- mail-service: `http://localhost:8025/`

All API documentation is available at: [http://localhost:3001/docs](http://localhost:3001/docs)


#### Testing

##### Unit tests

- To run unit tests for api-service, use: `docker exec -it api-service npm run test:unit:cov`
- For stock-service, execute: `docker exec -it stock-service npm run test:unit:cov`

##### Integration tests

- Before running integration tests, set up the test database by executing the following commands respectively:
  - `docker exec -it api-service npm run db:test:create`
  - `docker exec -it api-service npm run db:test:migrate`

- Once the test database is set up, run the integration tests with: `docker exec -it api-service npm run test:integration`

## Video

You can watch the demonstration video by following this [link](https://www.loom.com/share/4a3d93f345b1481fb42082b2212f29a2?sid=2838bc7e-cfcc-4fb3-9534-7758e251f0ad).

## Improvements

Below is a list of enhancements I consider important for the future of the project:

- **Use TypeScript**: Enhance code maintainability and scalability.
- **Add More Validations**: Implement additional validation for route parameters.
- **Implement Message Brokering**: Utilize message brokering for asynchronous processes such as sending emails.

