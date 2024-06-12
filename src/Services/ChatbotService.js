const inquirer = require('inquirer');
const {NlpManager} = require("node-nlp");
const { TrainClassifier } = require('./ClassifierService.js');
const { createReservation, updateReservation, deleteReservation, checkReservation } = require('./ReservationService.js');
const { getClassificationHandlers, ReservationQuestions } = require('./Chatbot.util.js');
const { log } = require('../Services/util.js');


class ChatbotService {
    _manager = null;
    constructor() {
        this._manager = new NlpManager({ languages: ['en'], nlu: { log: false } });
        TrainClassifier(this._manager);
    }

    /**
     * Classifies the input using the NLP manager.
     * 
     * @param {string} input 
     * @returns 
     */
    async getClassifications(input) {
        return this._manager.process('en', input);
    }

    /**
     * Processes the user's input by classifying it and executing the corresponding handler.
     * 
     * @param {string} input - The user's input to be processed.
     */
    async handleInput(input) {
        if (input.trim().length < 1) {
            log('Sorry, I did not understand that, please try again.');
            this.startChatbot();
            return;
        }

        let response;

        try {
            response = await this.getClassifications(input);
            if (! response.intent) {
                log('Sorry, I did not understand that, please try again...');
                this.startChatbot();
                return;
            }
        } catch (error) {
            log('Sorry, I did not understand that, please try again..');
            this.startChatbot();
            return;
        }

        const classificationHandlers = getClassificationHandlers(
            this.startChatbot.bind(this), 
            this.makeReservation.bind(this), 
            this.modifyReservation.bind(this), 
            this.cancelReservation.bind(this),
            this.checkReservation.bind(this)
        );

        const classificationHandler = classificationHandlers[response.intent];
        if (! classificationHandler) {
            log('Sorry, I did not understand that, please try again!');
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
            log('An error occurred. Please try again.');
            log(error);
            this.startChatbot();
        });
    }

    async makeReservation() {
        try {
            const answers = await inquirer.prompt(ReservationQuestions.make_reservation);
            const { name, date, time, partySize, specialRequests } = answers;
    
            const confirm = await inquirer.prompt(ReservationQuestions.confirm_make_reservation(name, date, time, partySize, specialRequests));
    
            if (! confirm.confirm) {
                log('Operation stopped.\n');
                return;
            }
    
            log(`Creating a reservation for ${name} on ${date} at ${time}.`);

            const {id} = (await createReservation(name, date, time, partySize, specialRequests)).data;

            log(`Your reservation has been created. Your confirmation number is ${id}.`);
        } catch(error) {
            log('An error occurred. Please try again.');
        } finally {
            this.startChatbot();
        }
    }
    
    async modifyReservation() {
        try {
            const answers = await inquirer.prompt(ReservationQuestions.modify_reservation);
            const { name, date, time, partySize, specialRequests, id } = answers;
    
            const confirm = await inquirer.prompt(ReservationQuestions.confirm_modify_reservation(name, date, time, partySize, specialRequests));
    
            if (! confirm.confirm) {
                log('Operation stopped.\n');
                return;
            }

            log(`Updating your reservation for ${name} on ${date} at ${time} party size: ${partySize}.`);

            await updateReservation(id, name, date, time, partySize, specialRequests);
            log('Your reservation has been updated.');
        } catch(error) {
            if (error.response?.data?.message) {
                log(error.response.data.message);
            } else {
                log('An error occurred. Please try again.');
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
                log('Operation stopped.\n');
                return;
            }
    
            log(`Attempting to cancel your reservation...`);

            await deleteReservation(answers.id);

            log('Your reservation has been cancelled.');
        } catch(error) {
            if (error.response?.data?.message) {
                log(error.response.data.message);
            } else {
                log('An error occurred. Please try again.');
            }
        } finally {
            this.startChatbot();
        }
    }

    async checkReservation() {
        try {
            const {id} = await inquirer.prompt(ReservationQuestions.check_reservation);
    
            log(`Checking your reservation...`);
            const {name, date, time, party_size, special_requests} = (await checkReservation(id)).data;
            log(`Reservation found:\nName: ${name}\nDate: ${date}\nTime: ${time}\nParty Size: ${party_size}\nSpecial Requests: ${special_requests}`);
        } catch(error) {
            if (error.response?.data?.message) {
                log(error.response.data.message);
            } else {
                log('An error occurred. Please try again.');
            }
        } finally {
            this.startChatbot();
        }
    }
}

module.exports = ChatbotService;