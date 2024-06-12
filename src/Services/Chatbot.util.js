const { NameStrategy, DateStrategy, TimeStrategy, PartySizeStrategy, SpecialRequestsStrategy } = require("../Strategy/QuestionStrategies");
const { log } = require('../Services/util.js');

function getClassificationHandlers(startChatbot, makeReservation, modifyReservation, cancelReservation) {
    return {
        make_reservation: makeReservation,
        modify_reservation: modifyReservation,
        cancel_reservation: cancelReservation,
        greet: function () {
            log('Hello! How can I assist you today?');
            startChatbot();
        },
        farewell: function () {
            log('Goodbye! Have a great day!');
        },
        thanks: function () {
            log('You\'re welcome!');
            startChatbot();
        },
        name: function () {
            log('I am your virtual assistant. How can I help you today?');
            startChatbot();
        }
    }

}

function buildQuestion(question, name, type, validate) {
    return {
        message: question,
        name: name,
        type: type,
        validate: validate
    }
}

const nameQuestion = new NameStrategy('Please provide your name: ');
const dateQuestion = new DateStrategy('Please provide the date (YYYY-MM-DD): ');
const timeQuestion = new TimeStrategy('Please provide the time (HH:MM): ');
const partySizeQuestion = new PartySizeStrategy('Please provide the party size: ');
const specialRequestsQuestion = new SpecialRequestsStrategy('Please provide any special requests: ');

const modifyNameQuestion = new NameStrategy('Please provide your new name: ');
const modifyDateQuestion = new DateStrategy('Please provide the new date (YYYY-MM-DD): ');
const modifyTimeQuestion = new TimeStrategy('Please provide the new time (HH:MM): ');
const modifyPartySizeQuestion = new PartySizeStrategy('Please provide the new party size: ');
const modifySpecialRequestsQuestion = new SpecialRequestsStrategy('Please provide any new special requests: ');

const modifyReservationQuestion = buildQuestion('Please provide your reservation confirmation number: ', 'id', 'input', (value) => {
    if (value.length < 1) {
        return 'Confirmation number cannot be empty.';
    }
    return true;
});

const cancelReservationQuestion = buildQuestion('Please provide your reservation confirmation number: ', 'id', 'input', (value) => {
    if (value.length < 1) {
        return 'Confirmation number cannot be empty.';
    }
    return true;
});

const ReservationQuestions = {
    make_reservation: [
        nameQuestion.getData(),
        dateQuestion.getData(),
        timeQuestion.getData(),
        partySizeQuestion.getData(),
        specialRequestsQuestion.getData(),
    ],
    modify_reservation: [
        modifyReservationQuestion,
        modifyNameQuestion.getData(),
        modifyDateQuestion.getData(),
        modifyTimeQuestion.getData(),
        modifyPartySizeQuestion.getData(),
        modifySpecialRequestsQuestion.getData(),
    ],
    cancel_reservation: [
        cancelReservationQuestion
    ],
    confirm_make_reservation: (name, date, time, partySize) => [
        buildQuestion(`Please confirm your reservation for ${name} on ${date} at ${time} of ${partySize} person(s)`, 'confirm', 'confirm')
    ],
    confirm_modify_reservation: (name, date, time, partySize) => [
        buildQuestion(`Please confirm your reservation modification for ${name} on ${date} at ${time} of ${partySize} person(s).`, 'confirm', 'confirm')
    ],
    confirm_cancel_reservation: (id) => [
        buildQuestion(`Please confirm the cancellation of reservation ${id}.`, 'confirm', 'confirm')
    ]
    
}

module.exports = {getClassificationHandlers, ReservationQuestions};