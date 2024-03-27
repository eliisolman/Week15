const express = require('express');
const Wish = require('./model/wish'); 

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Eliis proovib saada Githubi tööle. :) 

app.post('/wish', async (req, res) => { 
    let userData = req.body.userWish.trim(); 
    let newWish;
    if (userData === '') {
        newWish = new Wish("Empty Wish"); 
    } else {
        newWish = new Wish(userData);
    }
    await newWish.saveWish(); 
    res.redirect('/');
});

app.get('/', (req, res) => {
    Wish.fetchAllWishes(wishesfromfile => {
        res.render('index', {mywishes: wishesfromfile});
    });
});

const port = 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});