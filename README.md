# Node.js Reservation Chatbot

## Overview

This project is a Node.js application for a restaurant reservation chatbot. The chatbot allows customers to make, modify, and cancel reservations through command-line prompts. The project uses SQLite for data storage and is containerized using Docker for easy deployment.

## Features

- Make a reservation
- Modify an existing reservation
- Cancel a reservation
- Check a reservation
- AI Supported Chatbot

## Prerequisites

- Node.js
- npm
- Docker

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:alhabarneh/chatbot.git
   cd chatbot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Migrate the database
   ```bash
   node database/migrate.js
   ```

### Running the Application

To run the API locally:

```bash
node app.js
```
The application will be accessible at `http://localhost:3000`.

To run the chatbot locally and interact with it through the command line:
```bash
node index.js
```

### Using Docker

#### Build the Docker Image

```bash
docker build -t chatbot .
```

#### Run the Docker Container

```bash
docker run -p 3000:3000 chatbot
```

The application will be accessible at `http://localhost:3000`.

## API Endpoints

- `POST /reservations/make` - Make a reservation
- `PUT /reservations/modify` - Modify a reservation
- `PUT /reservations/cancel` - Cancel a reservation

## Database Configuration

The application uses SQLite for database management. The database configuration can be found in `config/database.js`.

### Example Configuration (`config/database.js`)

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

module.exports = db;
```
