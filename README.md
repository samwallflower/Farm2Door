# Farm2Door 🚜🍎

**Farm2Door** is a full-stack e-commerce marketplace designed to connect local farmers directly with consumers. By eliminating the middleman, the platform ensures farmers get fair prices for their produce while customers receive high quality fresh goods.

---

## 🌟 Key Features

* **Secure Authentication:** Implemented stateless authentication using **JWT (JSON Web Tokens)**.
* **Role-Based Access Control (RBAC):**
    * **Users:** Can browse products, manage their cart, and place/track orders.
    * **Shop Owners:** Full CRUD capabilities for their products and order management dashboard.
* **Clean Architecture:** Built following **OOP design principles** for maintainability.
* **Data Integrity:** Uses **DTOs (Data Transfer Objects)** to abstract the database layer from the frontend, improving security and performance.
* **Persistent Cart:** Logged-in users can save items to their basket and return to them later.

---

## 🛠 Tech Stack

### Backend
* **Java 17+** & **Spring Boot**
* **Spring Security** (Authentication & Authorization)
* **Spring Data JPA** (Hibernate)
* **MySQL** (Relational Database)
* **Maven** (Dependency Management)

### Frontend
* **React.js** (Functional components & Hooks)
* **Axios** (API communication)
* **CSS3** (Responsive design)

---

## 📂 Project Structure

```text
Farm2Door/
├── Backend/           # Spring Boot REST API
│   ├── src/main/java  # Source code (Controllers, Services, DTOs, etc.)
│   └── pom.xml        # Backend dependencies
└── FrontEnd/          # React Application
    ├── src/           # Components and Pages
    └── package.json   # Frontend dependencies
```
## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
* Java JDK 17+
* Node.js (v18+) & npm
* MySQL Server
* Maven (built into most IDEs)

### 1. Database Configuration
1. Create a database named `farm2door_db` in your MySQL server.
2. Navigate to `Backend/src/main/resources/application.properties`.
3. Update the following lines with your local credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/farm2door_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=create
```
### 2. Run the Backend (Spring Boot)
1. Open a terminal in the `/Backend` folder.
2. Run the command:
   
```bash
mvn spring-boot:run
```
*The API will start on http://localhost:8080.*

### 3. Run the Frontend (React)
1. Open a new terminal in the `/FrontEnd` folder.
2. Install the necessary packages:
```bash
npm install
```
*The UI will open on http://localhost:3000.*

---

## 🔒 Security & Roles

The application uses **Spring Security** with **JWT** for stateless authentication. Access is restricted based on role-based access control (RBAC):

| Action | Guest | User | Shop Owner |
| :--- | :---: | :---: | :---: |
| Browse Products | ✅ | ✅ | ✅ |
| Add to Cart | ❌ | ✅ | ❌ |
| Place Orders | ❌ | ✅ | ❌ |
| Manage Own Orders | ❌ | ✅ | ✅ |
| Add/Edit Products | ❌ | ❌ | ✅ |
| Delete Products | ❌ | ❌ | ✅ |

---

## 🏗 Architectural Highlights

* **DTO Pattern:** Data Transfer Objects are used to ensure that internal database entities are never exposed directly to the React frontend, enhancing security and reducing payload size.
* **REST API:** Clean, resource-based endpoints for all CRUD operations.
* **OOP Design:** High use of interfaces and service-layer abstraction to keep the code modular and testable.
* **JWT Authentication:** Secure, token-based login system for authenticated sessions.
