const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', (req, res) => {
        fetch('http://172.30.110.122/rest/v7/ports/1/16', { 
            headers: {
                'cookie': req.session.cookie
            }
        })
        .then(res => res.json())
        .then(json => {console.log(json)})
	res.sendFile('index2.html', { root: 'public' });
})

  
  
module.exports = router;