const express = require('express');
const fs = require('fs');
const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('./web.html');
    } catch (error) {
        return res.status(400).send(`sommethingWent wrong: ${error}`);
    }
    
})

router.get('/prices', async (req, res) => {
    const data = fs.readFileSync('./history.json');
    res.send(data);
})

cron.schedule('* * 10 * * 1-5', () => {
    const parentDir = path.resolve(process.cwd());
    console.log(parentDir)
    const child = exec("node Index.js", {
        cwd: parentDir
    });
    child.stdout.on('data', function(data) {
        console.log(data); 
    });
});

module.exports = router;