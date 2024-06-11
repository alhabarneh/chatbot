const inquirer = require('inquirer');
const natural = require('natural');
const { TrainClassifier } = require('./ClassifierService.js');
const { createReservation, updateReservation, deleteReservation } = require('./ReservationService.js');
const { getClassificationHandlers, ReservationQuestions } = require('./Chatbot.util.js');


class ChatbotService {
    _classifier = null;
    constructor() {
        this._classifier = new natural.BayesClassifier();
        TrainClassifier(this._classifier);
    }

    getClassifications(input) {
        return this._classifier.getClassifications(input);
    }

    /**
     * Processes the user's input by classifying it and executing the corresponding handler.
     * 
     * @param {string} input - The user's input to be processed.
     */
    handleInput(input) {
        const classifications = this._classifier.getClassifications(input);

        if (classifications.length < 1) {
            console.log('Sorry, I did not understand that.');
            this.startChatbot();
            return;
        }
        
        let classification;

        try {
            classification = classifications[0].label;
            const confidence = classifications[0].value;

            if (confidence < 0.05) {
                console.log('Sorry, I did not understand that.');
                this.startChatbot();
                return;
            }
        } catch (error) {
            console.log('Sorry, I did not understand that..');
            this.startChatbot();
            return;
        }

        const classificationHandlers = getClassificationHandlers(
            this.startChatbot.bind(this), 
            this.makeReservation.bind(this), 
            this.modifyReservation.bind(this), 
            this.cancelReservation.bind(this)
        );

        const classificationHandler = classificationHandlers[classification];
        if (! classificationHandler) {
            console.log('Sorry, I did not understand that...');
            this.startChatbot();
            return;
        }

        classificationHandler();
    }

    /**
     * Initiates the chatbot by prompting the user for input using inquirer.
     * Handles the user's input with the handleInput method, and restarts the chatbot if an error occurs.
     */
    startChatbot() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'input',
                message: 'You: ',
            }
        ]).then((answers) => {
            this.handleInput(answers.input);
        }).catch((error) => {
            console.log('An error occurred. Please try again.');
            console.log(error);
            this.startChatbot();
        });
    }

    async makeReservation() {
        try {
            const answers = await inquirer.prompt(ReservationQuestions.make_reservation);
            const { name, date, time } = answers;
    
            const confirm = await inquirer.prompt(ReservationQuestions.confirm_make_reservation(name, date, time));
    
            if (! confirm.confirm) {
                console.log('Operation stopped.\n');
                return;
            }
    
            console.log(`Creating a reservation for ${name} on ${date} at ${time}.`);

            const {data: {id}} = await createReservation(answers.name, answers.date, answers.time);

            console.log('Your reservation has been created. Your confirmation number is', id, '.');
        } catch(error) {
            console.log('An error occurred. Please try again.');
        } finally {
            this.startChatbot();
        }
    }
    
    async modifyReservation() {
        try {
            const answers = await inquirer.prompt(ReservationQuestions.modify_reservation);
            const { name, date, time } = answers;
    
            const confirm = await inquirer.prompt(ReservationQuestions.confirm_modify_reservation(name, date, time));
    
            if (! confirm.confirm) {
                console.log('Operation stopped.\n');
                return;
            }

            console.log(`Updating your reservation for ${name} on ${date} at ${time}.`);

            await updateReservation(answers.id, answers.name, answers.date, answers.time);

            console.log('Your reservation has been updated.');
        } catch(error) {
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
            } else {
                console.log('An error occurred. Please try again.');
            }
        } finally {
            this.startChatbot();
        }
    }
    
    async cancelReservation() {
        try {
            const answers = await inquirer.prompt(ReservationQuestions.cancel_reservation);
            const confirm = await inquirer.prompt(ReservationQuestions.confirm_cancel_reservation(answers.id));
    
            if (! confirm.confirm) {
                console.log('Operation stopped.\n');
                return;
            }
    
            console.log(`Attempting to cancel your reservation...`);

            await deleteReservation(answers.id);

            console.log('Your reservation has been cancelled.');
        } catch(error) {
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
            } else {
                console.log('An error occurred. Please try again.');
            }
        } finally {
            this.startChatbot();
        }
    }
}

module.exports = ChatbotService;