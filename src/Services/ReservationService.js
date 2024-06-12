const apiClient = require('../Clients/AxiosInstance');

/**
 * Sends a POST request to the server to create a new reservation
 * 
 * @param {string} name 
 * @param {string} date 
 * @param {string} time 
 * @param {number} partySize 
 * @param {string} specialRequests 
 * @returns Promise<{id: number}>
 */
async function createReservation(name, date, time, partySize = 1, specialRequests = null) {
    return apiClient.post('/reservations/create', {
        name,
        date,
        time,
        partySize,
        specialRequests,
    });
}

/**
 * Sends a PUT request to the server to update an existing reservation
 * 
 * @param {number} id 
 * @param {string} name 
 * @param {string} date 
 * @param {string} time 
 * @param {number} partySize 
 * @param {string} specialRequests 
 * @returns Promise<{id: number}>
 */
async function updateReservation(id, name, date, time, partySize = 1, specialRequests = null) {
    return apiClient.put('/reservations/update', {
        id,
        name,
        date,
        time,
        partySize,
        specialRequests,
    });
}

/**
 * Sends a PUT request to the server to delete an existing reservation
 * 
 * @param {number} id 
 * @returns Promise<{cancelled: boolean}>
 */
async function deleteReservation(id) {
    return apiClient.put('/reservations/cancel', {
        id,
    });
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
};