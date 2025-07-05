# Frontend - E-commerce Angular Application

This project is the front-end counterpart of a Java Spring Boot-based e-commerce back-end. The frontend runs on `http://localhost:4200/`, it communicates with the backend via RESTful HTTP endpoints and supports authentication, product browsing, shopping cart management, and user-specific operations.

---

## 🔧 Key Features

- Angular CLI version 15.2.2
- Developed using:
  - **TypeScript** for component and service logic
  - **HTML** templates for structure
  - **CSS** stylesheets for presentation  
  > _Each component includes a `.ts`, `.html`, and `.css` file._
- RESTful communication with backend (at `http://localhost:8080`)
- JWT-based authentication and route protection
- Role-based access for:
  - `USER`: browse, view, buy products, manage cart and orders
  - `ADMIN`: add, update, remove products
- Component-based architecture with routing and lazy loading
- Integration with **Angular Material** and **Bootstrap** for responsive design

---

## 🗂️ Major Routes and Components

| Route                | Component                  | Access Role | Description                                    |
|---------------------|----------------------------|-------------|------------------------------------------------|
| `/`                 | `StartComponent`           | Public      | Landing page                                   |
| `/login`            | `LoginComponent`           | Public      | User login                                     |
| `/registerNewUser`  | `RegisterComponent`        | Public      | User registration                              |
| `/user`             | `UserComponent`            | USER        | User dashboard                                 |
| `/admin`            | `AdminComponent`           | ADMIN       | Admin dashboard                                |
| `/addProduct`       | `AddProductComponent`      | ADMIN       | Add new product                                |
| `/updateProduct`    | `UpdateProductComponent`   | ADMIN       | Update product details                         |
| `/showAllProducts`  | `ShowAllProductsComponent` | USER, ADMIN | View all products                              |
| `/viewProduct`      | `ViewProductDetailsComponent` | USER, ADMIN | View detailed product information              |
| `/buyProduct`       | `BuyProductComponent`      | USER        | Buy a product                                  |
| `/userCart`         | `CartComponent`            | USER        | View and manage shopping cart                  |
| `/userOrders`       | `UserOrdersComponent`      | USER        | View order history                             |
| `/forbidden`        | `ForbiddenComponent`       | Public      | Access denied page                             |

> Routing is protected via `AuthGuard` and access is restricted by roles.

---

## 🔐 Authentication & Security

- Uses **JWT tokens** for login/session management.
- Upon login, token is stored locally and attached automatically to requests via the `AuthInterceptor`.
- Angular route guards (`AuthGuard`) and role metadata restrict access to authorized users only.
- Unauthorized access is redirected to the `/forbidden` route.

---

## 🖼️ Product Image Handling

- Each product may contain **multiple images**, which are:
  - **Stored in the PostgreSQL database** via the backend
  - **Base64-encoded** and sent to the frontend
- The `ImageProcessorComponent`:
  - Converts base64 images into `Blob` and `File` objects
  - Sanitizes URLs using `DomSanitizer`
  - Enables secure and dynamic image preview in the browser

---

## 🎨 UI & Design

- Built with **Angular Material** components:
  - Toolbar, Forms, Buttons, Icons, Dialogs, Tables, Snackbar, etc.
- Uses **Bootstrap** classes and grids for layout and responsiveness
- Designed for desktop usage with responsive adaptation

---

## 🔗 Backend Integration

- Communicates with backend REST API available at:  
  `http://localhost:8080`
- Backend implemented in:
  - **Java 11** with **Spring Boot**
  - **PostgreSQL** database
- Handles:
  - User registration and login
  - Product and image management
  - Order processing

---

## 🧪 Development & Testing

### Development server
```bash
ng serve


# Frontend1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to 
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
