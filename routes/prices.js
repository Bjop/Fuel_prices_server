const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('./web.html');
    } catch (error) {
        return res.status(400).send(`sommethingWent wrong: ${error}`);
    }
    
})

router.get('/prices', async (req, res) => {
    console.log('executed');
    const data = fs.readFileSync('./history.json');
    res.send(data);
})

module.exports = router;