# SERC Task

This is a webapp created as part of employment task given by SERC at Stevens Institute of Technology.

## Technologies Used

- MySQL
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) (ORM)
- [Datatables](https://datatables.net/)
- React

## How to setup locally

Before running this application, make sure you have [Node.js](https://nodejs.org/en/download/) and [MySQL](https://www.mysql.com/downloads/) installed on your machine.

Alternatively, for MySQL you could also use a docker container. [Official MySQL Docker Image](https://hub.docker.com/_/mysql)

### Clone

Clone the repo to your local machine using

```
git clone https://github.com/khatri7/serc-challenge.git
```

### Setup

Install npm dependencies in both the `client` and `server` subdirectories and also the root directory using `npm install`

```shell
$ npm install
$ cd server && npm install
$ cd ../client && npm install
```

The root directory has been initialized as an npm project and installs [`concurrently`](https://www.npmjs.com/package/concurrently) as a dev dependency to start both the client and the server with a single command

Create a `.env` file in both the `client` and `server` subdirectories as shown in the `.env.example` files

Set up the following environment variables

In `client/.env`:

```ini
REACT_APP_SERVER_URL=http://localhost:3005/
```

The server application will start on port `3005`

In `server/.env`:

```ini
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

Replace `user` in the string with your username, `password` with the user's password `3306` with the port on which you are running MySQL, and `mydb` with the name of the database.

### Run

Before, you start the application, from the `server` directory, run the following command to sync database with the schema in our application

```shell
npx prisma db push
```

Finally, to run the code, from the root directory you can start the application using:

```shell
$ npm run start:dev
```

You can also view the data in your database and perform operations using [Prisma Studio](https://www.prisma.io/studio). To start Prisma Studio on port `5555`, from the `server` directory, run the following command

```shell
npx prisma studio
```
