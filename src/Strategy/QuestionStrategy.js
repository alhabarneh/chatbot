class QuestionStrategy {
    _message;
    _name;
    _type;

    constructor(message) {
        this._message = message;
    }

    validate(value) {
        throw new Error('You have to implement the method validate!');
    }

    getData() {
        return {
            message: this._message,
            name: this._name,
            type: this._type,
            validate: this.validate
        }
    }
}

module.exports = QuestionStrategy;