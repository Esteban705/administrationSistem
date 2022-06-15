const { default: mongoose } = require("mongoose");


const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("base de datos conectada");
  } catch (error) {
    throw new Error("no se puedo conectar a la base de datos");
  }
};
module.exports = conectDB;
