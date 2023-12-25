const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/UsageDB", {
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