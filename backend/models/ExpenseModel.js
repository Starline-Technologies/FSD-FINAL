const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jebinshaju:jebinshaju@cluster0.s0sj5ym.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("db connected");
    })
    .catch(err => console.log(err))

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"expense"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)