const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ajavedbese21seecs:jani1243@cluster0.xjdvgvy.mongodb.net/UsageDB", {
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