# Financial Management

**Financial Management** is a robust application designed to assist users in managing their finances effectively. The application is built using modern technologies, featuring a clear separation between backend and frontend components.

## Table of Contents
- [Technology Stack](#technology-used)
- [Design](#design)
- [Installation Guide](#installation-guide)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Technologies Used
### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (jsonwebtoken)**: Token-based authentication system.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module for loading environment variables.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing).
- **Validator**: Library for string validation and sanitization.
- **Nodemon**: Tool for automatically restarting the server during development.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Next-generation front-end tooling.
- **TailwindCSS**: Utility-first CSS framework.
- **DaisyUI**: UI component library for TailwindCSS.
- **React Router DOM**: Declarative routing for React.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Lodash**: Utility library for JavaScript.
- **Notistack**: Notification library for React.
- **React Icons**: Popular icons as React components.
- **Recharts**: Chart library for React.
- **React Gauge Chart**: Gauge chart component for React.
- **ESLint**: Linting utility for JavaScript and JSX.

## Design
The design for this application was inspired by and sourced from the [Figma Community](https://www.figma.com/community/file/1227525441534506928/finebank-financial-management-dashboard-ui-kits). It provides a user-friendly and visually appealing interface that enhances the overall user experience.

## Installation Guide

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rizkisepriadi/Financial_Management.git
2. Navigate to the backend directory:
   ```bash
   cd Financial_Management/backend
4. Install the necessary dependencies:
   ```bash
   pnpm install
5. Start the server:
   ```bash
   pnpm start

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
2. Install the necessary dependencies:
   ```bash
   pnpm install
3. Start the frontend application:
   ```bash
   pnpm dev

## Getting Started
Once both the backend and frontend are running, you can access the application by visiting http://localhost:3000 in your web browser.

## Contributing
We welcome contributions from the community. Please ensure that your code adheres to the project's coding standards and submit a pull request for review.
