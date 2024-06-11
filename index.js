const inquirer = require('inquirer');
const natural = require('natural');
const { TrainClassifier } = require('./src/Services/ClassifierService.js');
const { isValidDate, isValidTime } = require('./src/Services/util.js');
const { createReservation, updateReservation, deleteReservation } = require('./src/Services/ReservationService.js');

const classifier = new natural.BayesClassifier();
TrainClassifier(classifier);

// handle user input and generate responses
function handleInput(input) {
    const classifications = classifier.getClassifications(input);

    if (classifications.length < 1) {
        console.log('Sorry, I did not understand that.');
        startChatbot();
        return;
    }
    
    let classification;

    try {
        classification = classifications[0].label;
        const confidence = classifications[0].value;

        if (confidence < 0.05) {
            console.log('Sorry, I did not understand that.');
            startChatbot();
            return;
        }
    } catch (error) {
        console.log('Sorry, I did not understand that..');
        startChatbot();
        return;
    }

    switch (classification) {
        case 'make_reservation':
            makeReservation();
            break;
        case 'modify_reservation':
            modifyReservation();
            break;
        case 'cancel_reservation':
            cancelReservation();
            break;
        case 'greet':
            console.log('Hello! How can I assist you today?');
            startChatbot();
            break;
        case 'farewell':
            console.log('Goodbye! Have a great day!');
            break;
        case 'thanks':
            console.log('You\'re welcome!');
            startChatbot();
            break;
        case 'name':
            console.log('I am a chatbot created to assist you with your reservation queries.');
            startChatbot();
            break;
        default:
            console.log('Sorry, I did not understand that...');
            startChatbot();
    }
}

// Function to start the chatbot
function startChatbot() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'input',
            message: 'You: ',
        }
    ]).then((answers) => {
        handleInput(answers.input);
    }).catch((error) => {
        console.log('An error occurred. Please try again.');
        console.log(error);
        startChatbot();
    });
}

async function makeReservation() {
    try {
        const answers = await inquirer.prompt([
            {
                message: 'Please provide your name: ',
                name: 'name',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Name cannot be empty.';
                    }
                    return true;
                },
            },
            {
                message: 'Please provide the date (YYYY-MM-DD): ',
                name: 'date',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Date and time cannot be empty.';
                    }

                    if (!isValidDate(value)) {
                        return 'Invalid date format. Please use YYYY-MM-DD.';
                    }

                    return true;
                },
            },
            {
                message: 'Please provide the time (HH:MM): ',
                name: 'time',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Date and time cannot be empty.';
                    }

                    if (!isValidTime(value)) {
                        return 'Invalid time format. Please use HH:MM.';
                    }

                    return true;
                },
            }
        ]);


        const { name, date, time } = answers;

        const confirm = await inquirer.prompt([
            {
                message: `Please confirm your reservation for ${name} on ${date} at ${time}.`,
                name: 'confirm',
                type: 'confirm',
            }
        ]);

        if (! confirm.confirm) {
            console.log('Operation stopped.\n');
            return;
        }

        console.log(`Creating a reservation for ${name} on ${date} at ${time}.`);
        const {id} = (await createReservation(answers.name, answers.date, answers.time)).data;
        console.log('Your reservation has been created. Your confirmation number is', id, '.');
    } catch(error) {
        console.log('An error occurred. Please try again.');
        console.log(error.message);
    } finally {
        startChatbot();
    }
}

async function modifyReservation() {
    try {
        const answers = await inquirer.prompt([
            {
                message: 'Please provide your reservation confirmation number: ',
                name: 'id',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Confirmation number cannot be empty.';
                    }
                    return true;
                },
            },
            {
                message: 'Please provide your new name: ',
                name: 'name',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Name cannot be empty.';
                    }
                    return true;
                },
            },
            {
                message: 'Please provide the new date (YYYY-MM-DD): ',
                name: 'date',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Date and time cannot be empty.';
                    }

                    if (!isValidDate(value)) {
                        return 'Invalid date format. Please use YYYY-MM-DD.';
                    }

                    return true;
                },
            },
            {
                message: 'Please provide the new time (HH:MM): ',
                name: 'time',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Date and time cannot be empty.';
                    }

                    if (!isValidTime(value)) {
                        return 'Invalid time format. Please use HH:MM.';
                    }

                    return true;
                },
            }
        ]);


        const { name, date, time } = answers;

        const confirm = await inquirer.prompt([
            {
                message: `Please confirm your reservation for ${name} on ${date} at ${time}.`,
                name: 'confirm',
                type: 'confirm',
            }
        ]);

        if (! confirm.confirm) {
            console.log('Operation stopped.\n');
            return;
        }

        console.log(`Updating your reservation for ${name} on ${date} at ${time}.`);
        const data = (await updateReservation(answers.id, answers.name, answers.date, answers.time)).data;
        console.log('Your reservation has been updated.');
    } catch(error) {
        if (error.response?.data?.message) {
            console.log(error.response.data.message);
        } else {
            console.log('An error occurred. Please try again.');
        }
    } finally {
        startChatbot();
    }
}

async function cancelReservation() {
    try {
        const answers = await inquirer.prompt([
            {
                message: 'Please provide your reservation confirmation number that you want to cancel: ',
                name: 'id',
                type: 'input',
                validate: (value) => {
                    if (value.length < 1) {
                        return 'Confirmation number cannot be empty.';
                    }
                    return true;
                },
            },
        ]);

        const confirm = await inquirer.prompt([
            {
                message: `Please confirm that you want to cancel your reservation.`,
                name: 'confirm',
                type: 'confirm',
            }
        ]);

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
        startChatbot();
    }
}


// Start the chatbot
console.log('Hi there I am your virtual assistance to help you manage your reservations\nI can help you make a new reservation, modify your reservation, or cancel a reservation.\nHow may I assist you today?');
startChatbot();
