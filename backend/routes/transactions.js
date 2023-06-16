const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const { createProfile, getProfiles, deleteProfile } = require('../controllers/profile');


const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/createProfile',createProfile)
    .get('/getProfiles',getProfiles)
    .delete('/deleteProfile',deleteProfile)

module.exports = router