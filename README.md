# Books_Management
# Description
This project consists of a Book Management App that uses Spring Boot for the backend, Angular for the frontend, and MySQL as the database . Backend Book Management App is a Spring Boot application for managing books. It provides RESTful endpoints to create, read, update, and delete book information Frontend Book Mangement App is a angular application for managing Books  It provides Interface to create, read, update, and delete book information .

## Backend 
The application will be accessible at http://localhost:1997.

# Dependencies
1. Spring Boot Starter Parent: 3.3.0
2. Spring Boot Starter Data JPA
3. Spring Boot Starter Validation
4. Spring Boot Starter Web
5. Spring Boot DevTools
6. Project Lombok
7. Spring Boot Starter Test
8. MySQL Connector Java
9. Sping boot starter oauth2 resource server

# Configuration
The application uses MySQL as the database. create a new DataBase "books_db" . Configure the application.properties file with your database settings :
 
1.spring.datasource.url=jdbc:mysql://localhost:3306/books_db
2.spring.datasource.username=yourusername
3.spring.datasource.password=yourpassword
4.spring.jpa.hibernate.ddl-auto=update
5.spring.jpa.show-sql=true



## Frontend 
This project was generated with Angular CLI version 16.2.9 and uses node v18.4.0

# Installation
To install the project dependencies, follow these steps:

1. Clone this repository: git clone https://github.com/lobnarjili/Book_store_fin.git 

3. Navigate into the project directory: cd Frontend_bookStore

4. Install the dependencies with npm: npm install

Run ng serve  for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
