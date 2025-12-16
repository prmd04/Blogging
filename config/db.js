const mongoose = require("mongoose");


const connectDb = async () =>{
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  try{
    const url =(`mongodb+srv://${user}:${password}@cluster0.sbhg4qk.mongodb.net/Blogging`)
    await mongoose.connect(url)

    console.log("DB is connected");
  }
  catch(error){
    console.log( console.error("DB connection failed:", error.message))

    process.exit(1);
  }
}

module.exports = connectDb;