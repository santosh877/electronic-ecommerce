const express = require('express');
const router = express.Router();

//Route
router.get('/create-or-update-user' , (req, res) => {
    res.json({
       data: 'hey you hit the node API updated',
    })
});

module.exports = router;