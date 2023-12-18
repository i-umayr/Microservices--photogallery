const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/authDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch((err) => {
        console.log("Could not connect to mongoose");
        console.log(err);
    })


module.exports={mongoose}