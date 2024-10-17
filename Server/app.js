var express = require('express');
var app = express();
require('dotenv').config();
require('./db/dbConnection')
var port = process.env.PORT || 3001;
var path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var sAdminRouter = require('./routes/SuperAdminRoutes');
var adminRouter = require('./routes/AdminRoutes')
var userRouter = require('./routes/UserRoutes');

var cors = require('cors');

var corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
}

app.use(cors(corsOption));
app.use(express.json())

app.use('/api/sAdmin', sAdminRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server Running on Port : ${port}`);
})