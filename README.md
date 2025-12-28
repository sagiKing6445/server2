# CRUD Management System

## Overview
This is a comprehensive CRUD (Create, Read, Update, Delete) management system with a Node.js/Express backend and Angular frontend. The system manages three entities: Users, Roles, and User Roles.

## Project Structure

### Backend (Server)
Located at: `server-main/server-main/`

#### Architecture Layers:
1. **Models** - Database interaction layer
   - `models/user.model.js` - User entity model
   - `models/role.model.js` - Role entity model
   - `models/userRole.model.js` - User-Role relationship model

2. **Controllers** - Business logic layer
   - `controllers/users.controller.js` - User CRUD operations
   - `controllers/roles.controller.js` - Role CRUD operations
   - `controllers/userRoles.controller.js` - User-Role assignment operations

3. **Routers** - API endpoint definitions
   - `routers/users.router.js` - Routes for user endpoints
   - `routers/roles.router.js` - Routes for role endpoints
   - `routers/userRoles.router.js` - Routes for user-role endpoints

4. **Middleware** - Request processing layer
   - `middleware/mysqldb.js` - Database connection and queries
   - `middleware/server.js` - Express server configuration

5. **Main App**
   - `app.js` - Application entry point

### Frontend (Client)
Located at: `server-main/client2/`

#### Components:
1. **Services** - API communication layer
   - `services/user.service.ts` - User API calls
   - `services/role.service.ts` - Role API calls
   - `services/user-role.service.ts` - User-Role API calls

2. **Components** - UI components
   - `components/users.component.ts/html/css` - User management interface
   - `components/roles.component.ts/html/css` - Role management interface
   - `components/user-roles.component.ts/html/css` - User-Role assignment interface

3. **Main App**
   - `app.ts` - Root component with navigation
   - `app.html` - Main template with router
   - `app.css` - Application styles
   - `app.config.ts` - Angular configuration

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Roles
- `GET /roles` - Get all roles
- `GET /roles/:id` - Get role by ID
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### User Roles
- `GET /user-roles` - Get all user-role assignments
- `GET /user-roles/:id` - Get specific user-role assignment
- `POST /user-roles` - Assign role to user
- `PUT /user-roles/:id` - Update user-role assignment
- `DELETE /user-roles/:id` - Remove role from user

## Installation

### Backend
```bash
cd server-main/server-main
npm install
node app.js
```

Server will run on `http://localhost:3000`

### Frontend
```bash
cd server-main/client2
npm install
npm start
```

Client will run on `http://localhost:4200`

## Database Configuration

The system expects a MySQL database with the following tables:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

Update database credentials in `middleware/mysqldb.js`:
```javascript
{
  host: "localhost",
  database: "example",
  user: "admin",
  password: "admin"
}
```

## Features

### User Management
- List all users
- View user details
- Create new users
- Edit existing users
- Delete users

### Role Management
- List all roles
- View role details
- Create new roles
- Edit existing roles
- Delete roles

### User-Role Management
- Assign roles to users
- View user role assignments
- Update role assignments
- Remove roles from users

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2/Promise

### Frontend
- Angular 20
- TypeScript
- RxJS

## UI Features

- Clean and intuitive navigation menu
- Responsive design
- Hebrew language support (RTL text alignment)
- Form validation
- Confirmation dialogs for deletions
- Real-time data updates
- Tabbed interface for each entity

