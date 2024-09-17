import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 


const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("La URI de MongoDB no está definida en las variables de entorno");
  }

  try {
 
    await mongoose.connect(mongoURI);
    
    console.log(`MongoDB conectado: ${mongoose.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error al conectar a MongoDB: ${error.message}`);
    } else {
      console.error(`Error desconocido al conectar a MongoDB: ${error}`);
    }
    process.exit(1);  
  }
};

export default connectDB;
