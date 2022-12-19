import mongoose from "mongoose";

// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("Ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === 1) {
      console.log("Usando conexión anterior");
      return;
    }
    try {
      await mongoose.disconnect();
      mongooConnection.isConnected = 0;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    mongooConnection.isConnected = 1;
    console.log("Conectado a MongoDB: ", process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  if (mongooConnection.isConnected === 0) return;
  try {
    await mongoose.disconnect();
    mongooConnection.isConnected = 0;
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.log(error);
  }
};
