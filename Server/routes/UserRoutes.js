var express = require('express');
var User = require('../controller/UserController');
var router = express.Router();

router.post('/generateToken', User.generateToken,
    /* 
            #swagger.tags = ['User']
            #swagger.path = '/api/user/generateToken'
            #swagger.description = 'Generate User Token'

            #swagger.parameters['body'] = { 
             in: 'body', 
             required: true,
               "@schema": { 
               "properties": { 
                    "userId":{
                        "type":"string"
                    },
                    "userName":{
                        "type":"string"
                    },
                    "userEmail":{
                        "type":"string"
                    }
               }
           } 
       } 
    */
)

module.exports = router;