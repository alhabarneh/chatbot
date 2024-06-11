function TrainClassifier(classifier) {
    const trainingData = [
        { text: 'make a reservation', label: 'make_reservation' },
        { text: 'book a table', label: 'make_reservation' },
        { text: 'reserve a table', label: 'make_reservation' },
        { text: 'modify my reservation', label: 'modify_reservation' },
        { text: 'change my reservation', label: 'modify_reservation' },
        { text: 'update my reservation', label: 'modify_reservation' },
        { text: 'cancel my reservation', label: 'cancel_reservation' },
        { text: 'delete my reservation', label: 'cancel_reservation' },
        { text: 'confirm my reservation', label: 'confirm_reservation' },
        { text: 'check my reservation', label: 'confirm_reservation' },
        { text: 'hello', label: 'greet' },
        { text: 'hi', label: 'greet' },
        { text: 'how are you', label: 'greet' },
        { text: 'bye', label: 'farewell' },
        { text: 'goodbye', label: 'farewell' },
        { text: 'see you', label: 'farewell' },
        { text: 'thank you', label: 'thanks' },
        { text: 'thanks', label: 'thanks' },
        { text: 'what is your name', label: 'name' },
        { text: 'who are you', label: 'name' }
    ];
    
    trainingData.forEach(item => {
        classifier.addDocument(item.text, item.label);
    });
    
    classifier.train();
}

module.exports = {
    TrainClassifier
};