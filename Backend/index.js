const express = require('express');
const cors = require('cors');
const Country = require('./data/country.json');
const State = require('./data/state.json');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/getdata', (req, res) => {
    const { collection, filter } = req.body;
    if (!filter) {
        res.status(200).json(Country);
    }
    else {
        const filterdata = State.filter(c => c[filter.key] === filter.value);
        res.status(200).json(filterdata);
    }
});


app.listen(3001, () => {
    console.log('App started');
});