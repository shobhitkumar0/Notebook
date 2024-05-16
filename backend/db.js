const mongoose =require('mongoose')
const mongoURI="mongodb://localhost:27017"

// const connectToMongoose=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to mongoose succefully")
//     })
// }
const connectToMongoose = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to mongoose successfully");
    } catch (error) {
      console.error("Error connecting to mongoose:", error);
    }
  };
  
module.exports=connectToMongoose