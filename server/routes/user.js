const express = require('express');
const router = express.Router();

//Route
router.get('/user' , (req, res) => {
    res.json({
       data: 'hey you hit the user API end point',
    })
});

module.exports = router;