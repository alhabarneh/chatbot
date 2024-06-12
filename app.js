require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const apiMiddleware = require('./src/Middlewares/APIKeyMiddleware.js');

const reservationController = require('./src/Controllers/ReservationController.js');

router.post('/create', reservationController.makeReservation);

router.put('/update', reservationController.updateReservation);

router.put('/cancel', reservationController.deleteReservation);

app.use(apiMiddleware);
app.use(bodyParser.json());
app.use('/reservations', router);

console.log('base_url: ', process.env.BASE_URL);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});