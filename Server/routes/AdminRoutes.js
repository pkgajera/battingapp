var express = require("express");
const router = express.Router();
var Admin = require('../controller/AdminController');
var SAdminMiddleware = require('../middleware/adminMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);

        const sanitizedBaseName = baseName.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Example: replace non-alphanumeric characters

        // Construct the new filename with the original name
        cb(null, `${sanitizedBaseName}${ext}`);
    }
});

const upload = multer({ storage });

router.get("/get", SAdminMiddleware, Admin.get,
    /* 
        #swagger.tags = ['Admin']
        #swagger.path = '/api/admin/get'
        #swagger.description = 'Get All Admins'
    */
);
router.post("/login", Admin.login,
    /* 
                #swagger.tags = ['Admin']
                #swagger.path = '/api/admin/login'
                #swagger.description = 'Login admin'
       
                #swagger.parameters['body'] = { 
                 in: 'body', 
                 required: true,
                   "@schema": { 
                   "properties": { 
                        "email":{
                            "type":"string"
                        },
                        "password":{
                            "type":"string"
                        }
                   }
               } 
           } 
        */
);

router.post("/register", SAdminMiddleware, upload.single('webLogo'), Admin.register,
    /* 
            #swagger.tags = ['Admin']
            #swagger.path = '/api/admin/register'
            #swagger.description = 'Register Admin'
   
            #swagger.parameters['body'] = { 
             in: 'body', 
             required: true,
               "@schema": { 
               "properties": { 
                    "username":{
                        "type":"string"
                    }, 
                    "email":{
                        "type":"string"
                    }, 
                    "phone":{
                        "type:"string"
                    }, 
                    "password":{
                        "type":"string"
                    }, 
                    "website":{
                        "type":"string"
                    },
                    "webLogo":{
                        "type":"string"
                    }
               }
           } 
       } 
    */
);

router.post("/update/:id", SAdminMiddleware, upload.single('webLogo'), Admin.update,
    /* 
      #swagger.tags = ['Admin']
      #swagger.path = '/api/admin/update/{id}'
      #swagger.description = 'Update Admin by id'

      #swagger.parameters['body'] = { 
          in: 'body', 
          required: true,
            "@schema": { 
            "properties": { 
                 "username":{
                     "type":"string"
                 }, 
                 "email":{
                     "type":"string"
                 }, 
                 "phone":{
                     "type:"string"
                 }, 
                 "password":{
                     "type":"string"
                 }, 
                 "website":{
                     "type":"string"
                 },
                 "webLogo":{
                     "type":"string"
                 }
            }
        } 
 */
);

router.get("/getSingle/:id", SAdminMiddleware, Admin.getSingle,
    /* 
      #swagger.tags = ['Admin']
      #swagger.path = '/api/admin/getSingle/{id}'
      #swagger.description = 'Get Single Admin by id'
    */
);

router.post("/delete/:id", SAdminMiddleware, Admin.deleteAdmin,
    /* 
      #swagger.tags = ['Admin']
      #swagger.path = '/api/admin/delete/{id}'
      #swagger.description = 'Delete Admin by id'
    */
);

module.exports = router;