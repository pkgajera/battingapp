var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO).then(() => console.log("Db Connected Successfully.")).catch((e) => console.log(e))