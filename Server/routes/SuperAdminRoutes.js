var express = require('express');
var router = express.Router();
var SuperAdmin = require("../controller/SuperAdmin")

router.get("/get", SuperAdmin.get,
    /* 
        #swagger.tags = ['Super Admin']
        #swagger.path = '/api/sAdmin/get'
        #swagger.description = 'Get All Super Admins'
    */
)

router.post("/register", SuperAdmin.register,
    /* 
            #swagger.tags = ['Super Admin']
            #swagger.path = '/api/sAdmin/register'
            #swagger.description = 'Register Super Admin'
   
   
            #swagger.parameters['body'] = { 
             in: 'body', 
             required: true,
               "@schema": { 
               "properties": { 
                    "sAdminEmail":{
                        "type":"string"
                    },
                    "sAdminPass":{
                        "type":"string"
                    }
               }
           } 
       } 
    */
);

router.post("/login", SuperAdmin.login,
    /* 
                #swagger.tags = ['Super Admin']
                #swagger.path = '/api/sAdmin/login'
                #swagger.description = 'Login Super Admin'
       
       
                #swagger.parameters['body'] = { 
                 in: 'body', 
                 required: true,
                   "@schema": { 
                   "properties": { 
                        "sAdminEmail":{
                            "type":"string"
                        },
                        "sAdminPass":{
                            "type":"string"
                        }
                   }
               } 
           } 
        */
);

module.exports = router;
