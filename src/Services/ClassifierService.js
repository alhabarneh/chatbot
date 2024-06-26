async function TrainClassifier(manager) {
    const trainingData = [
        { text: 'make a reservation', label: 'make_reservation' },
        { text: 'book a table', label: 'make_reservation' },
        { text: 'reserve a table', label: 'make_reservation' },
        { text: 'i want to make a reservation', label: 'make_reservation' },
        { text: 'i want to book a table', label: 'make_reservation' },
        { text: 'i want to reserve a table', label: 'make_reservation' },

        { text: 'modify my reservation', label: 'modify_reservation' },
        { text: 'change my reservation', label: 'modify_reservation' },
        { text: 'update my reservation', label: 'modify_reservation' },
        { text: 'i want to modify my reservation', label: 'modify_reservation' },
        { text: 'i want to change my reservation', label: 'modify_reservation' },
        { text: 'i want to update my reservation', label: 'modify_reservation' },
        
        { text: 'cancel my reservation', label: 'cancel_reservation' },
        { text: 'delete my reservation', label: 'cancel_reservation' },
        { text: 'i want to cancel my reservation', label: 'cancel_reservation' },
        { text: 'i want to delete my reservation', label: 'cancel_reservation' },

        { text: 'see my reservation', label: 'check_reservation' },
        { text: 'check my reservation', label: 'check_reservation' },
        { text: 'view my reservation', label: 'check_reservation' },
        { text: 'my reservation status', label: 'check_reservation' },

        { text: 'hello', label: 'greet' },
        { text: 'hi', label: 'greet' },
        { text: 'how are you', label: 'greet' },

        { text: 'bye', label: 'farewell' },
        { text: 'goodbye', label: 'farewell' },
        { text: 'see you', label: 'farewell' },
        { text: 'i must go', label: 'farewell' },

        { text: 'thank you', label: 'thanks' },
        { text: 'thanks', label: 'thanks' },
        
        { text: 'what is your name', label: 'name' },
        { text: 'who are you', label: 'name' }
    ];
    
    trainingData.forEach(item => {
        manager.addDocument('en', item.text, item.label);
    });
    
    await manager.train();
    manager.save();
}

module.exports = {
    TrainClassifier
};