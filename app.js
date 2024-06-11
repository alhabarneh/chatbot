const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const reservationController = require('./src/controllers/ReservationController.js');

router.post('/create', reservationController.makeReservation);

router.put('/update', reservationController.updateReservation);

router.put('/cancel', reservationController.deleteReservation);

app.use(bodyParser.json());
app.use('/reservations', router);

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});