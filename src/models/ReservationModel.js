const db = require('../config/database');

const createReservation = async (name, date, time) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO reservations (name, date, time) VALUES ($1, $2, $3) RETURNING *', [name, date, time], function (err) {
            if (err) {
                reject(err);
            }

            resolve(this.lastID);
        });
    });
};

const updateReservation = async (id, name, newDate, newTime) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE reservations SET name = $1, date = $2, time = $3 WHERE id = $4 RETURNING *', 
            [name, newDate, newTime, id],
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