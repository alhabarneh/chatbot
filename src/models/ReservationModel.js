const db = require('../config/database');

const createReservation = async (name, date, time, partySize = 1, specialRequests = '') => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO reservations (name, date, time, party_size, special_requests) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [name, date, time, partySize, specialRequests], 
            function (err) {
            if (err) {
                reject(err);
            }

            resolve(this.lastID);
        });
    });
};

const updateReservation = async (id, name, newDate, newTime, partySize = 1, specialRequests = '') => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE reservations SET name = $1, date = $2, time = $3, party_size = $4, special_requests = $5 WHERE id = $6 RETURNING *', 
            [name, newDate, newTime, partySize, specialRequests, id],
            function (err) {
                if (err) {
                    reject(err);
                }

                if (this.changes === 0) {
                    reject(new Error('Reservation not found.'));
                }
                resolve(this.changes);
            }
        );
    });
};

const deleteReservation = async (id) => {
    return new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM reservations WHERE id = $1', 
            [id], 
            function (err) {
                if (err) {
                    reject(err);
                }

                if (this.changes === 0) {
                    reject(new Error('Reservation not found.'));
                }
                resolve(this.changes);
            });
    });
};

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation,
};