const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shyam:pTwkDoOWabxLcFRx@cluster0-lptxg.mongodb.net/task-app?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true }, (error,result) => {
    if(error){
        throw new Error(error)
    }
    console.log('connected')

})