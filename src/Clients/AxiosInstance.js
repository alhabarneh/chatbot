const axios = require('axios');

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
    headers: {
        'x-api-key': process.env.API_KEY
    }
});

module.exports = apiClient;