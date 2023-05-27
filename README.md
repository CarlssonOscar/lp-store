# Robot Store

This is a simple e-commerce application for a robot store. You can add robots to your cart and place an order.

## Setup and Run

1. First, you need Node.js and npm installed on your machine. If you do not have these installed, you can download and install Node.js from the [official website](https://nodejs.org), which comes with npm.

2. Clone this repository to your local machine.

    ```bash
    git clone <repository_url>
    ```

3. Navigate into the directory of the project.

    ```bash
    cd <repository_directory>
    ```

4. Install the dependencies.

    ```bash
    npm install
    npm install --save-dev concurrently
    ```

5. Start the development server.

    ```bash
    npm run dev
    ```

    This will start both the frontend React application and backend JSON server concurrently. The React application runs on port 3000, and the JSON server runs on port 3001.

## Check Orders

To check the orders that have been placed in the store, you can open the `db.json` file. This file serves as a simple database for the application and is automatically updated when orders are placed.
