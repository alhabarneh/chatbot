const reservationModel = require('../Models/ReservationModel.js');

const makeReservation = async (req, res) => {
    try {
        const { name, date, time, partySize, specialRequests } = req.body;
        const reservation = await reservationModel.createReservation(name, date, time, partySize, specialRequests);
        res.status(200).json({id: reservation});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const updateReservation = async (req, res) => {
    try {
        const { id, name, date, time, partySize, specialRequests } = req.body;
        const reservation = await reservationModel.updateReservation(id, name, date, time, partySize, specialRequests);
        res.status(200).json({id});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.body;
        const reservation = await reservationModel.deleteReservation(id);
        res.status(200).json({cancelled: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const checkReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await reservationModel.checkReservation(id);
        res.status(200).json(reservation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    makeReservation,
    updateReservation,
    deleteReservation,
    checkReservation,
};