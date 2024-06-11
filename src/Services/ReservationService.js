const axios = require('axios');


async function createReservation(name, date, time, partySize = 1, specialRequests = null) {
    const url = process.env.BASE_URL + "/reservations/create";
    return axios.post(url, {
        name,
        date,
        time,
        partySize,
        specialRequests
    })
}

async function updateReservation(id, name, date, time, partySize = 1, specialRequests = null) {
    const url = process.env.BASE_URL + "/reservations/update";
    return axios.put(url, {
        id,
        name,
        date,
        time,
        partySize,
        specialRequests
    })
}

async function deleteReservation(id) {
    const url = process.env.BASE_URL + "/reservations/cancel";
    return axios.put(url, { id });
}

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
};