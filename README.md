# Node.js Reservation Chatbot

## Overview

This project is a Node.js application for a restaurant reservation chatbot. The chatbot allows customers to make, modify, and cancel reservations through command-line prompts. The project uses SQLite for data storage and NLP for data training.

## Features

- Make a reservation
- Modify an existing reservation
- Cancel a reservation
- Check a reservation
- AI Supported Chatbot

## Prerequisites

- Node.js 20
- npm

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
*You can change the PORT in the .env file, also make sure to change the port number in the BASE_URL variable as well in the .env file.*

To run the chatbot locally and interact with it through the command line:
```bash
node index.js
```

## API Endpoints

- `POST /reservations/make` - Make a reservation
- `PUT /reservations/modify` - Modify a reservation
- `PUT /reservations/cancel` - Cancel a reservation
- `GET /reservations/:id` - Check a reservation

### API KEY
The API key should be provided in the .env file for the chatbot app to communicate with the Reservation API. If you like to update the API key with a different one you could use the following code to generate a new strong API key
```javascript
const crypto = require('crypto');

// Generate a random 32-byte (256-bit) API key, represented as a hexadecimal string
const apiKey = crypto.randomBytes(32).toString('hex');

console.log(`Generated API Key: ${apiKey}`);
```

## Database Configuration

The application uses SQLite for database management. The database configuration can be found in `config/database.js`.

### Example Configuration (`config/database.js`)

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

module.exports = db;
```
