const { isValidDate, isValidTime } = require('../Services/util');
const QuestionStrategy = require('./QuestionStrategy');

class NameStrategy extends QuestionStrategy{
    _name = 'name';
    _type = 'input';
    validate = (value) => {
        if (value.length < 1) {
            return 'Name cannot be empty.';
        }
        return true;
    }
}

class DateStrategy extends QuestionStrategy{
    _name = 'date';
    _type = 'input';
    validate = (value) => {
        if (value.length < 1) {
            return 'Date and time cannot be empty.';
        }

        if (!isValidDate(value)) {
            return 'Invalid date format. Please use YYYY-MM-DD.';
        }

        return true;
    }
}

class TimeStrategy extends QuestionStrategy{
    _name = 'time';
    _type = 'input';
    validate = (value) => {
        if (value.length < 1) {
            return 'Date and time cannot be empty.';
        }

        if (!isValidTime(value)) {
            return 'Invalid time format. Please use HH:MM.';
        }

        return true;
    }
}

class PartySizeStrategy extends QuestionStrategy{
    _name = 'partySize';
    _type = 'input';
    validate = (value) => {
        if (isNaN(value) || value < 1) {
            return 'Party size must be a number greater than 0.';
        }

        return true;
    }
}

class SpecialRequestsStrategy extends QuestionStrategy{
    _name = 'specialRequests';
    _type = 'input';
    validate = (value) => {
        return true;
    }
}

module.exports = {
    NameStrategy,
    DateStrategy,
    TimeStrategy,
    PartySizeStrategy,
    SpecialRequestsStrategy,
};
