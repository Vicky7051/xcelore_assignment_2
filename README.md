# Xcelore Assignment 2

## Over View

This Assignment developed in MERN Stack Technology
There are two role in this project:
- Admin
- User

## Features
- User can register it self.
- User can login own account and logout by providing email and password.
- User password is hashed by using bcryptjs
- Admin can login own account by using email and password
- For the login session tracking i have used local storage for storeing JWT token
- Admin have access to create, read, update or delete an user

## Tech
- [ReactJs] - HTML enhanced for web apps.
- [node.js] - evented I/O for the backend.
- [Express] - fast node.js network app framework for development of API.
- [mongoDB] - Mongodb use for store the user details. mongodb use as a database.

## Installation.
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/vicky705/xcelore_assignment_2.git
```
```sh
cd xcelore_assignment_2
```

For backend serve
```sh
cd backend
```
```sh
npm instal
```
```sh
node index.js or nodemon
```

For frontend server
```sh
cd frontend
```
```sh
npm install
```
```sh
npm run dev
```


## Admin login details
First Step, You need to login default admin account for manage the user and admin as well.

email
```sh
admin@gmail.com
```
Password
```sh
Admin@#123
```

Once the admin login successfully. the you have authority to create, read, update and delete a user.
Auther - Vicky@Xcelore