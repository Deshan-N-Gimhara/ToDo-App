# Todo App Project

This project is a simple Todo application built with Vite ReactJS for the frontend, Tailwind CSS for styling, MySQL for the database, and Java Spring Boot for the backend.

## Project Structure

- **Client**: Frontend code located in the `client` folder.
- **Server**: Backend code located in the `server` folder.

## Frontend Dependencies

- [antd](https://www.npmjs.com/package/antd): ^5.11.4
- [moment](https://www.npmjs.com/package/moment): ^2.29.4
- [react](https://www.npmjs.com/package/react): ^18.2.0
- [react-axios](https://www.npmjs.com/package/react-axios): ^2.0.6
- [react-dom](https://www.npmjs.com/package/react-dom): ^18.2.0
- [react-icons](https://www.npmjs.com/package/react-icons): ^4.12.0
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): ^6.20.0

## Backend Dependencies

- [spring-boot-starter-web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web)
- [spring-boot-starter-test](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test) (Scope: test)
- [spring-boot-starter-data-jpa](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa)
- [mysql-connector-java](https://mvnrepository.com/artifact/mysql/mysql-connector-java/8.0.33)
- [lombok](https://mvnrepository.com/artifact/org.projectlombok/lombok) 
- [annotations](https://mvnrepository.com/artifact/org.jetbrains/annotations/24.0.1) (Scope: compile)

## Getting Started

### Frontend (Client)

1. Navigate to the `client` folder:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

    The app will be accessible at `http://localhost:3000`.

### Backend (Server)

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Open the `application.properties` file and provide your MySQL database credentials:

    ```properties
    
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

3. Build and run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

    The backend server will run on `http://localhost:8080`.

## Database Configuration

Make sure to create a MySQL database and update the `application.properties` file with the correct database name, username, and password.

